import pool from '../config/db.js';

/**
 * Payment Database Operations - Real-time Stripe Integration
 */

export const createPayment = async (paymentData) => {
  const {
    email,
    name,
    service_type,
    amount,
    currency = 'USD',
    stripe_session_id = null,
    stripe_payment_intent_id = null,
    metadata = null,
  } = paymentData;

  try {
    const result = await pool.query(
      `INSERT INTO payments (
        user_email, user_name,
        amount, currency, gateway,
        status, stripe_session_id, stripe_payment_intent_id,
        description, metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        email,
        name,
        amount,
        currency,
        'stripe',
        'pending',
        stripe_session_id,
        stripe_payment_intent_id,
        service_type ? `Payment for ${service_type}` : 'Stripe payment',
        metadata ? JSON.stringify(metadata) : null,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error('❌ Error creating payment:', error);
    throw error;
  }
};

export const getPayment = async (paymentId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payments WHERE id = $1',
      [paymentId]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('❌ Error fetching payment:', error);
    throw error;
  }
};

export const getPaymentByStripeSession = async (stripe_session_id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payments WHERE stripe_session_id = $1',
      [stripe_session_id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('❌ Error fetching payment by session:', error);
    throw error;
  }
};

export const getPaymentByStripeIntent = async (stripe_payment_intent_id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payments WHERE stripe_payment_intent_id = $1',
      [stripe_payment_intent_id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('❌ Error fetching payment by intent:', error);
    throw error;
  }
};

export const updatePaymentStatus = async (paymentId, status, transaction_id = null) => {
  try {
    const result = await pool.query(
      `UPDATE payments 
       SET status = $1,
           updated_at = CURRENT_TIMESTAMP,
           transaction_id = COALESCE($2, transaction_id),
           paid_at = CASE WHEN $1 = 'succeeded' THEN COALESCE(paid_at, CURRENT_TIMESTAMP) ELSE paid_at END
       WHERE id = $3
       RETURNING *`,
      [status, transaction_id, paymentId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('❌ Error updating payment status:', error);
    throw error;
  }
};

export const updateStripePaymentIntentForPayment = async (paymentId, stripe_payment_intent_id) => {
  try {
    const result = await pool.query(
      `UPDATE payments
       SET stripe_payment_intent_id = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [stripe_payment_intent_id, paymentId]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('❌ Error updating Stripe payment intent:', error);
    throw error;
  }
};
export const getUserPayments = async (user_email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payments WHERE user_email = $1 ORDER BY created_at DESC',
      [user_email]
    );
    return result.rows;
  } catch (error) {
    console.error('❌ Error fetching user payments:', error);
    throw error;
  }
};

export const getPaymentStats = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_payments,
        COUNT(CASE WHEN status = 'succeeded' THEN 1 END) as successful_payments,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_payments,
        COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_payments,
        SUM(CASE WHEN status = 'succeeded' THEN amount ELSE 0 END) as total_revenue
      FROM payments
    `);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Error fetching payment stats:', error);
    throw error;
  }
};

export default {
  createPayment,
  getPayment,
  getPaymentByStripeSession,
  getPaymentByStripeIntent,
  updatePaymentStatus,
  updateStripePaymentIntentForPayment,
  getUserPayments,
  getPaymentStats
};
