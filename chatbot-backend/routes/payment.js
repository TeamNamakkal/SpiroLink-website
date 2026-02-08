import express from 'express';
import Stripe from 'stripe';
import crypto from 'crypto';
import * as paymentsDb from '../db/payments.js';
import { sendPaymentConfirmation } from '../lib/emailService.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Create Stripe Payment Intent
 * POST /api/payment/stripe/create-intent
 */
router.post('/stripe/create-intent', async (req, res) => {
  try {
    const { email, name, serviceType, amount } = req.body;

    if (!email || !name || !serviceType || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, name, serviceType, amount' 
      });
    }

    if (amount < 1) {
      return res.status(400).json({ error: 'Amount must be at least $1' });
    }

    // Create a human-friendly reference (stored in Stripe + metadata)
    const payment_ref = `spiro_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create Stripe Session for checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      client_reference_id: payment_ref,
      success_url: `https://spirolink-website.onrender.com/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://spirolink-website.onrender.com/payment-cancel`,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `SPIROLINK - ${serviceType}`,
              description: `Payment for ${serviceType} services`,
              metadata: {
                service_type: serviceType,
                customer_name: name,
                customer_email: email,
              }
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        payment_ref,
        service_type: serviceType,
        customer_name: name,
        customer_email: email,
      },
    });

    // Store payment in database
    const paymentRecord = await paymentsDb.createPayment({
      email,
      name,
      service_type: serviceType,
      amount: parseFloat(amount),
      currency: 'USD',
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent || null,
      metadata: {
        payment_ref,
        service_type: serviceType,
        created_at: new Date().toISOString(),
      },
    });

    console.log(`✅ Stripe session created:`, {
      session_id: session.id,
      payment_id: paymentRecord.id,
      amount: `$${amount}`,
      customer: email
    });

    res.json({
      sessionId: session.id,
      paymentId: paymentRecord.id,
    });
  } catch (error) {
    console.error('❌ Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Payment Status
 * GET /api/payment/status/:paymentId
 */
router.get('/status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await paymentsDb.getPayment(paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    const service_type = payment?.metadata?.service_type || payment?.metadata?.serviceType || null;

    res.json({
      payment_id: payment.id,
      status: payment.status,
      amount: payment.amount,
      service_type,
      email: payment.user_email,
      created_at: payment.created_at,
      updated_at: payment.updated_at,
      transaction_id: payment.transaction_id,
    });
  } catch (error) {
    console.error('❌ Error fetching payment status:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Payment by Stripe Session
 * GET /api/payment/stripe/session/:sessionId
 */
router.get('/stripe/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    let payment = await paymentsDb.getPaymentByStripeSession(sessionId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found for session' });
    }

    // If webhook didn't update status, verify with Stripe (best-effort)
    if (payment.status !== 'succeeded') {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['payment_intent'],
        });

        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id || null;

        const isPaid =
          session.payment_status === 'paid' ||
          (typeof session.payment_intent !== 'string' && session.payment_intent?.status === 'succeeded');

        if (isPaid) {
          if (paymentIntentId) {
            await paymentsDb.updateStripePaymentIntentForPayment(payment.id, paymentIntentId);
          }

          payment =
            (await paymentsDb.updatePaymentStatus(payment.id, 'succeeded', paymentIntentId || session.id)) || payment;

          // Send confirmation email (best-effort)
          try {
            const service_type =
              payment?.metadata?.service_type ||
              payment?.metadata?.serviceType ||
              payment.description ||
              'Service';

            await sendPaymentConfirmation({
              email: payment.user_email,
              name: payment.user_name,
              amount: payment.amount,
              service_type,
              transaction_id: payment.transaction_id || paymentIntentId || session.id,
              payment_id: payment.id,
            });
          } catch (emailError) {
            console.error('⚠️  Failed to send confirmation email (session verify):', emailError.message);
          }
        }
      } catch (verifyError) {
        console.warn('⚠️  Stripe session verification failed:', verifyError.message);
      }
    }

    const service_type = payment?.metadata?.service_type || payment?.metadata?.serviceType || payment.description || null;

    res.json({
      payment_id: payment.id,
      status: payment.status,
      amount: payment.amount,
      email: payment.user_email,
      service_type,
      transaction_id: payment.transaction_id,
    });
  } catch (error) {
    console.error('❌ Error fetching payment by session:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Webhook Handler for Stripe Events
 * POST /api/payment/stripe/webhook
 * Listens for: charge.succeeded, charge.failed, checkout.session.completed, payment_intent.succeeded
 */
router.post('/stripe/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  let event;

  try {
    // Verify webhook signature
    const sig = req.headers['stripe-signature'];
    if (!sig || !webhookSecret) {
      console.warn('⚠️  Missing webhook signature or secret');
      return res.status(400).json({ error: 'Missing webhook signature' });
    }

    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    console.error('❌ Webhook signature verification failed:', error.message);
    return res.status(400).json({ error: `Webhook Error: ${error.message}` });
  }

  // Handle different event types
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('✅ Checkout session completed:', session.id);

        const payment = await paymentsDb.getPaymentByStripeSession(session.id);
        if (payment) {
          if (session.payment_intent) {
            await paymentsDb.updateStripePaymentIntentForPayment(payment.id, session.payment_intent);
          }

          // Update payment status to succeeded
          await paymentsDb.updatePaymentStatus(payment.id, 'succeeded', session.payment_intent || null);

          // Send confirmation email
          try {
            const service_type = payment?.metadata?.service_type || payment?.metadata?.serviceType || payment.description || 'Service';
            await sendPaymentConfirmation({
              email: payment.user_email,
              name: payment.user_name,
              amount: payment.amount,
              service_type,
              transaction_id: session.payment_intent || session.id,
              payment_id: payment.id,
            });
            console.log(`✅ Confirmation email sent to ${payment.user_email}`);
          } catch (emailError) {
            console.error('⚠️  Failed to send confirmation email:', emailError.message);
          }

          console.log(`✅ Payment succeeded for ${payment.user_email}: $${payment.amount}`);
        }
        break;
      }

      case 'charge.succeeded': {
        const charge = event.data.object;
        console.log('✅ Charge succeeded:', charge.id);
        
        const payment = await paymentsDb.getPaymentByStripeIntent(charge.payment_intent);
        if (payment && payment.status !== 'succeeded') {
          await paymentsDb.updatePaymentStatus(
            payment.id,
            'succeeded',
            charge.id
          );
        }
        break;
      }

      case 'charge.failed': {
        const charge = event.data.object;
        console.log('⚠️  Charge failed:', charge.id);

        const payment = await paymentsDb.getPaymentByStripeIntent(charge.payment_intent);
        if (payment) {
          await paymentsDb.updatePaymentStatus(
            payment.id,
            'failed',
            charge.id
          );
          console.log(`❌ Payment failed for ${payment.user_email}`);
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const intent = event.data.object;
        console.log('✅ Payment intent succeeded:', intent.id);

        const payment = await paymentsDb.getPaymentByStripeIntent(intent.id);
        if (payment && payment.status === 'pending') {
          await paymentsDb.updatePaymentStatus(
            payment.id,
            'processing',
            intent.id
          );
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object;
        console.log('❌ Payment intent failed:', intent.id);

        const payment = await paymentsDb.getPaymentByStripeIntent(intent.id);
        if (payment) {
          await paymentsDb.updatePaymentStatus(
            payment.id,
            'failed',
            intent.id
          );
        }
        break;
      }

      default:
        console.log(`⚠️  Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('❌ Error processing webhook:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
