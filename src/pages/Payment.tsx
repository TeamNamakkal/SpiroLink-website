import { useState } from 'react';

export default function Payment() {
  const [amount, setAmount] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const services = [
    'PON & FTTH',
    'Microwave Network',
    'Optical Long Haul',
    'WiFi Network',
    'Consulting & Design',
    'Other'
  ];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !serviceType || !amount) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    await handleStripePayment();
  };

  const handleStripePayment = async () => {
    try {
      if (amount < 1) {
        setError('Minimum amount is $1');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

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
          },
          description: serviceType || 'Payment for SPIROLINK services',
        }),
      });

      if (!intentResponse.ok) {
        const errorData = await intentResponse.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const intentData = await intentResponse.json();

      // Load Stripe
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      // Redirect to Stripe checkout
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId: intentData.sessionId,
      });

      if (redirectError) {
        throw new Error(redirectError.message || 'Failed to redirect to checkout');
      }

      setSuccess(true);
      setTransactionId(intentData.sessionId || 'processing');
      setName('');
      setEmail('');
      setAmount('');
      setServiceType('');
    } catch (err) {
      console.error('❌ Stripe error:', err);
      setError(err instanceof Error ? err.message : 'Failed to initiate payment');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 px-4 py-12">
      <div className="max-w-[520px] mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-xl font-semibold mb-2">SPIROLINK – Secure Payment</h1>
        <p className="text-sm text-slate-500 mb-7">
          Use this page to make payments for network design, consulting, training, or implementation services.
        </p>

        {success ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 mb-6">
            Payment successful. Transaction ID: <span className="font-mono">{transactionId}</span>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 mb-6">
            {error}
          </div>
        ) : null}

        <form onSubmit={handlePayment}>
          <label htmlFor="name" className="text-sm font-medium block mt-4 mb-2">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-blue-600"
            required
          />

          <label htmlFor="email" className="text-sm font-medium block mt-4 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-blue-600"
            required
          />

          <label htmlFor="service" className="text-sm font-medium block mt-4 mb-2">
            Service Type
          </label>
          <select
            id="service"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-blue-600"
            required
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>

          <label htmlFor="amount" className="text-sm font-medium block mt-4 mb-2">
            Payment Amount (USD)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-blue-600"
            min={1}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>

        <div className="mt-6 text-xs text-slate-500 text-center">
          You will be redirected to a secure Stripe payment page in the next step.
        </div>

        <div className="mt-6 text-xs text-slate-400 text-center">
          © SPIROLINK – Network Design & Engineering Excellence
        </div>
      </div>
    </div>
  );
}
