import { useState, useEffect, useRef } from 'react';

export default function Payment() {
  const [amount, setAmount] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'processing' | 'succeeded' | 'failed'>('idle');
  const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const services = [
    'PON & FTTH',
    'Microwave Network',
    'Optical Long Haul',
    'WiFi Network',
    'Consulting & Design',
    'Other'
  ];

  // Clean up status check interval on component unmount
  useEffect(() => {
    return () => {
      if (statusCheckIntervalRef.current) {
        clearInterval(statusCheckIntervalRef.current);
      }
    };
  }, []);

  // Poll payment status in real-time
  const startStatusPolling = (pId: string) => {
    if (statusCheckIntervalRef.current) {
      clearInterval(statusCheckIntervalRef.current);
    }

    statusCheckIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/payment/status/${pId}`);
        if (response.ok) {
          const contentType = response.headers.get('content-type') || '';
          if (!contentType.includes('application/json')) {
            const text = await response.text();
            console.warn('Non-JSON status response:', text.slice(0, 200));
            return;
          }

          const data = await response.json();
          setPaymentStatus(data.status || 'pending');
          
          if (data.status === 'succeeded') {
            setSuccess(true);
            setTransactionId(data.transaction_id || pId);
            if (statusCheckIntervalRef.current) {
              clearInterval(statusCheckIntervalRef.current);
            }
          } else if (data.status === 'failed') {
            setError('Payment failed. Please try again.');
            setPaymentStatus('failed');
            if (statusCheckIntervalRef.current) {
              clearInterval(statusCheckIntervalRef.current);
            }
          }
        }
      } catch (err) {
        console.error('Error checking payment status:', err);
      }
    }, 2000); // Check every 2 seconds
  };

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
      if (typeof amount !== 'number' || amount < 1) {
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

      setPaymentStatus('pending');

      const intentResponse = await fetch('/api/payment/stripe/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(amount),
          name,
          email,
          serviceType,
        }),
      });

      if (!intentResponse.ok) {
        const contentType = intentResponse.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errorData = await intentResponse.json();
          throw new Error(errorData.error || 'Failed to create payment intent');
        }
        const text = await intentResponse.text();
        throw new Error(
          `Payment API error (${intentResponse.status}). ` +
            (text.startsWith('<!DOCTYPE')
              ? 'Server returned HTML (API route missing or misrouted).'
              : text.slice(0, 200))
        );
      }

      const okContentType = intentResponse.headers.get('content-type') || '';
      if (!okContentType.includes('application/json')) {
        const text = await intentResponse.text();
        throw new Error(
          text.startsWith('<!DOCTYPE')
            ? 'Payment API returned HTML instead of JSON. Check backend deployment/routing.'
            : 'Payment API returned an unexpected response.'
        );
      }

      const intentData = await intentResponse.json();
      const pId = intentData.paymentId;
      
      // Start real-time status polling
      startStatusPolling(pId);

      // Load Stripe
      const { loadStripe } = await import('@stripe/stripe-js');
      const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
      if (!publishableKey) {
        throw new Error('Stripe publishable key missing (VITE_STRIPE_PUBLISHABLE_KEY)');
      }

      const stripe = await loadStripe(publishableKey);

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      setPaymentStatus('processing');

      // Redirect to Stripe checkout
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId: intentData.sessionId,
      });

      if (redirectError) {
        setPaymentStatus('failed');
        throw new Error(redirectError.message || 'Failed to redirect to checkout');
      }

    } catch (err) {
      console.error('❌ Stripe error:', err);
      setError(err instanceof Error ? err.message : 'Failed to initiate payment');
      setPaymentStatus('failed');
      setLoading(false);
      if (statusCheckIntervalRef.current) {
        clearInterval(statusCheckIntervalRef.current);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 px-4 py-12">
      <div className="max-w-[520px] mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-xl font-semibold mb-2">NODALWIRE – Secure Payment</h1>
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

        {paymentStatus === 'processing' && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 mb-6 flex items-center gap-2">
            <div className="animate-spin">⏳</div>
            <div>Processing your payment...</div>
          </div>
        )}

        {paymentStatus === 'pending' && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700 mb-6 flex items-center gap-2">
            <div>⏱️</div>
            <div>Payment pending - redirecting to Stripe...</div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 mb-6">
            Payment failed. Please try again.
          </div>
        )}

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
          © NODALWIRE – Network Design & Engineering Excellence
        </div>
      </div>
    </div>
  );
}
