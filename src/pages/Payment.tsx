import { useState } from 'react';
import { CreditCard, Shield, Check, AlertCircle, Loader } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nProvider';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const { t } = useI18n();
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe'>('razorpay');
  const [amount, setAmount] = useState<number | ''>('');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const paymentPlans = [
    {
      name: 'Basic',
      amount: paymentMethod === 'razorpay' ? 999 : 12,
      description: 'Perfect for getting started',
      features: ['Single service access', 'Email support', '30-day access']
    },
    {
      name: 'Professional',
      amount: paymentMethod === 'razorpay' ? 4999 : 49,
      description: 'For growing businesses',
      features: ['All services access', 'Priority support', '90-day access', 'Advanced analytics']
    },
    {
      name: 'Enterprise',
      amount: paymentMethod === 'razorpay' ? 9999 : 99,
      description: 'For large organizations',
      features: ['Unlimited access', '24/7 support', '1-year access', 'Custom integrations', 'Dedicated manager']
    },
  ];

  const handleQuickSelect = (planAmount: number, planName: string) => {
    setAmount(planAmount);
    setDescription(planName + ' Plan');
    setError('');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !amount) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (paymentMethod === 'razorpay') {
      await handleRazorpayPayment();
    } else {
      await handleStripePayment();
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      if (amount < 100) {
        setError('Minimum amount for Razorpay is ₹100');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        setError('Please enter a valid 10-digit phone number');
        setLoading(false);
        return;
      }

      const orderResponse = await fetch('/api/payment/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(amount) * 100,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
          customer: {
            name,
            email,
            contact: phone,
          },
          description: description || 'Payment for SPIROLINK services',
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(script);
        script.onload = () => initiateRazorpayPayment(orderData);
      } else {
        initiateRazorpayPayment(orderData);
      }
    } catch (err) {
      console.error('❌ Razorpay error:', err);
      setError(err instanceof Error ? err.message : 'Failed to initiate payment');
      setLoading(false);
    }
  };

  const handleStripePayment = async () => {
    try {
      if (amount < 1) {
        setError('Minimum amount for Stripe is $1');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      // Create payment intent
      const intentResponse = await fetch('/api/payment/stripe/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(amount),
          currency: 'usd',
          customer: {
            name,
            email,
            phone,
          },
          description: description || 'Payment for SPIROLINK services',
        }),
      });

      const intentData = await intentResponse.json();

      if (!intentResponse.ok) {
        throw new Error(intentData.error || 'Failed to create payment intent');
      }

      // Load Stripe
      const stripe = await import('@stripe/stripe-js').then(m =>
        m.loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')
      );

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      // Simulate test card payment for demo/testing
      // In production, use a Stripe Elements form for card collection
      const testCards = {
        success: '4242424242424242',
        requiresAuth: '4000002500003155',
      };

      // Use test card for demo purposes (in production, collect real card via UI)
      const cardToken = await stripe.createToken({
        number: testCards.success,
        exp_month: 12,
        exp_year: 2026,
        cvc: '123',
      });

      if (cardToken.error) {
        throw new Error(cardToken.error.message || 'Failed to create card token');
      }

      // Confirm payment with token
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        intentData.clientSecret,
        {
          payment_method: {
            card: cardToken.token.id,
            billing_details: {
              name,
              email,
            },
          },
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message || 'Payment failed');
      }

      if (paymentIntent?.status === 'succeeded') {
        // Verify payment on backend
        const verifyResponse = await fetch('/api/payment/stripe/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        });

        const verifyData = await verifyResponse.json();

        if (verifyResponse.ok) {
          setSuccess(true);
          setTransactionId(paymentIntent.id);
          setName('');
          setEmail('');
          setPhone('');
          setAmount('');
          setDescription('');
          console.log('✅ Stripe payment successful:', paymentIntent.id);
        } else {
          throw new Error(verifyData.error || 'Payment verification failed');
        }
      } else {
        throw new Error(`Payment status: ${paymentIntent?.status || 'unknown'}`);
      }
    } catch (err) {
      console.error('❌ Stripe error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process Stripe payment');
      setLoading(false);
    }
  };

  const initiateRazorpayPayment = (orderData: any) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
      amount: orderData.amount,
      currency: 'INR',
      order_id: orderData.id,
      name: 'SPIROLINK',
      description: description || 'Payment for services',
      prefill: {
        name,
        email,
        contact: phone,
      },
      theme: {
        color: '#0C94CE',
      },
      handler: async (response: any) => {
        try {
          const verifyResponse = await fetch('/api/payment/razorpay/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok) {
            setSuccess(true);
            setTransactionId(response.razorpay_payment_id);
            setName('');
            setEmail('');
            setPhone('');
            setAmount('');
            setDescription('');
            console.log('✅ Razorpay payment successful:', response.razorpay_payment_id);
          } else {
            throw new Error(verifyData.error || 'Payment verification failed');
          }
        } catch (err) {
          console.error('❌ Verification error:', err);
          setError(err instanceof Error ? err.message : 'Payment verification failed');
        }
        setLoading(false);
      },
      modal: {
        ondismiss: () => {
          setError('Payment cancelled');
          setLoading(false);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      {/* Header Section */}
      <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-40 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-cyan-500/10 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-full border border-cyan-400/30 text-sm font-semibold text-cyan-300 mb-6">
            💳 Secure Payments
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Payment Portal
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            Choose your preferred payment method. We accept both Razorpay (for India) and Stripe (worldwide). Real-time transaction verification.
          </p>
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading title="Choose Your Plan" subtitle="Select from our flexible pricing options" centered={true} />
        <div className="mb-12 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => {
              setPaymentMethod('razorpay');
              setCurrency('INR');
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              paymentMethod === 'razorpay'
                ? 'bg-sky-500 text-white shadow-lg'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            💳 Razorpay (₹ INR)
          </button>
          <button
            onClick={() => {
              setPaymentMethod('stripe');
              setCurrency('USD');
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              paymentMethod === 'stripe'
                ? 'bg-sky-500 text-white shadow-lg'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            💳 Stripe ($ USD)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {paymentPlans.map((plan, index) => (
            <div key={index} className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
              description === plan.name + ' Plan' ? 'border-sky-500 shadow-xl bg-gradient-to-br from-cyan-50 to-sky-50' : 'border-slate-200 bg-white hover:border-sky-300'
            }`}>
              <div className="p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-slate-900">
                    {paymentMethod === 'razorpay' ? '₹' : '$'}{plan.amount}
                  </span>
                  <span className="text-slate-600 ml-2">/one-time</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={description === plan.name + ' Plan' ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => handleQuickSelect(plan.amount, plan.name)}
                >
                  Select Plan
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Payment Form Section */}
      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Your Payment</h2>
            <p className="text-slate-300">Fast, secure transactions with real-time confirmation</p>
          </div>

          {success ? (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 text-center">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Payment Successful!</h3>
              <p className="text-green-800 mb-4">
                Your payment has been processed and confirmed in real-time.
              </p>
              <div className="bg-white rounded-lg p-4 mb-6 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Amount Paid</p>
                    <p className="text-lg font-bold text-gray-900">
                      {paymentMethod === 'razorpay' ? '₹' : '$'}{amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Payment Method</p>
                    <p className="text-sm font-bold text-gray-900">
                      {paymentMethod === 'razorpay' ? 'Razorpay' : 'Stripe'}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-600 font-semibold">Transaction ID</p>
                    <p className="text-sm font-mono text-gray-900 break-all">{transactionId}</p>
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  setSuccess(false);
                  setTransactionId('');
                }}
                className="mb-4"
              >
                Make Another Payment
              </Button>
              <p className="text-green-800 text-sm">
                A confirmation email has been sent to {email}
              </p>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone and Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                    Phone Number {paymentMethod === 'razorpay' ? '(10 digits)' : ''} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (paymentMethod === 'razorpay') {
                        setPhone(val.slice(0, 10));
                      } else {
                        setPhone(val.slice(0, 20));
                      }
                    }}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder={paymentMethod === 'razorpay' ? '9876543210' : '+1234567890'}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
                    Service Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="e.g., Professional Plan"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-semibold text-white mb-2">
                  Amount ({paymentMethod === 'razorpay' ? '₹' : '$'}) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400 font-semibold">
                    {paymentMethod === 'razorpay' ? '₹' : '$'}
                  </span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder={paymentMethod === 'razorpay' ? '1000' : '50'}
                    min={paymentMethod === 'razorpay' ? '100' : '1'}
                    step={paymentMethod === 'razorpay' ? '100' : '0.01'}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Minimum: {paymentMethod === 'razorpay' ? '₹100' : '$1'}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Security Info */}
              <div className="flex items-center gap-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <p className="text-cyan-300 text-sm">
                  {paymentMethod === 'razorpay'
                    ? 'Your payment is secured with Razorpay. UPI, Cards, and NetBanking supported.'
                    : 'Your payment is secured with Stripe using Payment Intents. Worldwide card payments accepted.'}
                </p>
              </div>

              {/* Submit Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay {paymentMethod === 'razorpay' ? '₹' : '$'}{amount || '0'} with {paymentMethod === 'razorpay' ? 'Razorpay' : 'Stripe'}
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </Section>


    </>
  );
}
