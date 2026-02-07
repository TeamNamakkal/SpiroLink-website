# 💳 SPIROLINK Payment Integration Guide

## Overview

The SPIROLINK payment system supports **both Razorpay and Stripe** with real-time transaction verification and email confirmations.

- **Razorpay**: Optimized for India (UPI, Cards, NetBanking)
- **Stripe**: Worldwide payments (Visa, Mastercard, Amex)

Users can select their preferred payment method on the `/payment` page.

---

## Quick Start

### 1. Get Your API Keys

#### Razorpay Keys
- **Website**: https://razorpay.com
- **Dashboard**: https://dashboard.razorpay.com
- **Get**: `RAZORPAY_KEY_ID` (Publishable) and `RAZORPAY_KEY_SECRET` (Secret)
- **Support**: India-focused, test mode available

#### Stripe Keys
- **Website**: https://stripe.com
- **Dashboard**: https://dashboard.stripe.com
- **Get**: `STRIPE_PUBLISHABLE_KEY` (Frontend) and `STRIPE_SECRET_KEY` (Backend)
- **Test Cards**: 4242424242424242 (visa, succeeds)

### 2. Set Environment Variables

Create `.env` files in both root and `chatbot-backend/`:

```bash
# Root .env (Frontend)
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxxxxxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxx

# chatbot-backend/.env (Backend)
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Install Dependencies

Both are already added to package.json:

```json
{
  "dependencies": {
    "razorpay": "^2.9.2",
    "@stripe/react-stripe-js": "^2.4.0",
    "@stripe/stripe-js": "^2.4.0",
    "stripe": "^13.10.0"
  }
}
```

Run:
```bash
npm install
cd chatbot-backend && npm install && cd ..
```

---

## File Structure

```
project/
├── src/pages/Payment.tsx                 # Main payment component
├── chatbot-backend/server.js             # API endpoints
├── package.json                          # Frontend deps
├── chatbot-backend/package.json          # Backend deps
└── .env                                  # Environment variables
```

---

## Frontend Implementation

### Payment.tsx Component

**Location**: `src/pages/Payment.tsx`

**Features**:
- Payment method selector (Razorpay ₹ / Stripe $)
- Dynamic pricing plans (Basic, Professional, Enterprise)
- Real-time form validation
- Success/failure handling
- Transaction ID display

**Key States**:
```typescript
const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe'>('razorpay');
const [amount, setAmount] = useState<number | ''>('');
const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [description, setDescription] = useState('');
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [transactionId, setTransactionId] = useState('');
```

**Payment Methods**:

1. **Razorpay Flow**:
   - User fills form and selects "Razorpay (₹ INR)"
   - Clicks "Pay ₹XXX with Razorpay"
   - Backend creates Razorpay order
   - Razorpay modal opens
   - User completes payment in modal
   - Backend verifies signature
   - Email confirmation sent

2. **Stripe Flow**:
   - User fills form and selects "Stripe ($ USD)"
   - Clicks "Pay $XXX with Stripe"
   - Frontend creates card token with test card
   - Backend creates Payment Intent
   - Card payment confirmed
   - Backend verifies payment status
   - Email confirmation sent

---

## Backend Implementation

### Server.js Endpoints

**Location**: `chatbot-backend/server.js`

#### Razorpay Endpoints

1. **Create Order**
   ```
   POST /api/payment/create-order
   ```
   **Request**:
   ```json
   {
     "amount": 100,
     "currency": "INR",
     "receipt": "order_1234567890",
     "customer": {
       "name": "John Doe",
       "email": "john@example.com",
       "contact": "9876543210"
     },
     "description": "Payment for services"
   }
   ```
   **Response**:
   ```json
   {
     "success": true,
     "id": "order_xxxxx",
     "amount": 100,
     "currency": "INR"
   }
   ```

2. **Verify Payment**
   ```
   POST /api/payment/verify-payment
   ```
   **Request**:
   ```json
   {
     "razorpay_order_id": "order_xxxxx",
     "razorpay_payment_id": "pay_xxxxx",
     "razorpay_signature": "sig_xxxxx"
   }
   ```
   **Response**:
   ```json
   {
     "success": true,
     "payment_id": "pay_xxxxx",
     "amount": 100,
     "status": "captured"
   }
   ```

3. **Get Payment Status**
   ```
   GET /api/payment/status/:payment_id
   ```
   **Response**:
   ```json
   {
     "success": true,
     "payment_id": "pay_xxxxx",
     "amount": 100,
     "status": "captured",
     "method": "card"
   }
   ```

#### Stripe Endpoints

1. **Create Payment Intent**
   ```
   POST /api/payment/stripe/create-intent
   ```
   **Request**:
   ```json
   {
     "amount": 50,
     "currency": "usd",
     "customer": {
       "name": "John Doe",
       "email": "john@example.com",
       "phone": "1234567890"
     },
     "description": "Payment for services"
   }
   ```
   **Response**:
   ```json
   {
     "success": true,
     "clientSecret": "pi_xxxxx_secret_xxxxx",
     "paymentIntentId": "pi_xxxxx",
     "amount": 50,
     "currency": "usd"
   }
   ```

2. **Verify Payment**
   ```
   POST /api/payment/stripe/verify-payment
   ```
   **Request**:
   ```json
   {
     "paymentIntentId": "pi_xxxxx"
   }
   ```
   **Response**:
   ```json
   {
     "success": true,
     "paymentIntentId": "pi_xxxxx",
     "amount": 50,
     "currency": "USD",
     "status": "succeeded"
   }
   ```

---

## Email Configuration

The payment system sends confirmation emails using either **Resend** or **SMTP**.

### Using Resend (Recommended)

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
```

[Get API Key](https://resend.com/api-keys)

### Using SMTP

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SERVICE=gmail
SMTP_SECURE=false
```

---

## Testing

### Test Cards

**Razorpay** (Development Mode):
- UPI: `success@razorpay`
- Cards: Standard test cards in dashboard

**Stripe** (Test Mode):
- Visa: `4242 4242 4242 4242` (Succeeds)
- Visa: `4000 0025 0000 3155` (Requires Authentication)
- Any expiry (future date), any CVC

### Test Flow

1. Go to `/payment` page
2. Select payment method
3. Fill form with test data
4. Use test card/UPI
5. Verify success page appears
6. Check email for confirmation
7. Check backend logs for verification success

---

## Security Best Practices

✅ **Implemented**:
- Razorpay signature verification (HMAC SHA256)
- Stripe Payment Intent verification
- Email validation
- Amount validation
- HTTPS enforced (Render/Netlify)
- PCI DSS compliance (using Stripe/Razorpay)

⚠️ **Important**:
- Never commit `.env` with real keys
- Use test keys for development
- Switch to live keys for production
- Monitor transactions in dashboards
- Set up webhooks for async events

---

## Deployment

### Environment Variables Setup

**For Render.com** or **Netlify**:

1. Go to project settings
2. Add environment variables:
   - `VITE_RAZORPAY_KEY_ID`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `STRIPE_SECRET_KEY`
   - `RESEND_API_KEY` (or SMTP credentials)

3. Rebuild/redeploy

### Production Checklist

- [ ] Switch to live API keys
- [ ] Test full payment flow
- [ ] Enable HTTPS
- [ ] Configure email service
- [ ] Set up monitoring/alerts
- [ ] Enable Stripe webhooks
- [ ] Configure Razorpay webhooks
- [ ] Review security settings
- [ ] Load test payment system
- [ ] Monitor transaction logs

---

## Troubleshooting

### Razorpay Issues

**"Payment service not configured"**
- Check `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
- Verify keys in `.env`
- Restart server

**"Signature mismatch"**
- Verify secret key is correct
- Check signature calculation logic
- Ensure order_id format is correct

**"Minimum amount is 100 paise"**
- Amount must be ≥ 100 (₹1)
- Check amount value in request

### Stripe Issues

**"Failed to create payment intent"**
- Check `STRIPE_SECRET_KEY` format
- Verify currency is lowercase (usd)
- Ensure amount is in dollars

**"Payment method not found"**
- Test card token creation failed
- Check card details format
- Verify Stripe is initialized

**"Payment not completed"**
- Card declined (use test card)
- Intent status not "succeeded"
- Check Stripe dashboard for details

### Email Issues

**"Email not sent"**
- Verify email service configured (Resend or SMTP)
- Check API key or credentials
- Review email logs in backend

---

## Support

For issues, check:
1. Backend logs: `chatbot-backend/server.js` output
2. Browser console: DevTools → Console
3. Razorpay Dashboard: https://dashboard.razorpay.com
4. Stripe Dashboard: https://dashboard.stripe.com

---

## API Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/payment/create-order` | Create Razorpay order |
| POST | `/api/payment/verify-payment` | Verify Razorpay payment |
| GET | `/api/payment/status/:id` | Get Razorpay payment status |
| POST | `/api/payment/stripe/create-intent` | Create Stripe Payment Intent |
| POST | `/api/payment/stripe/verify-payment` | Verify Stripe payment |

---

**Last Updated**: 2024  
**Version**: 2.0 (Dual Gateway)  
**Status**: Production Ready ✅
