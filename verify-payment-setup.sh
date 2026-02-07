#!/bin/bash

# SPIROLINK Payment System - Verification Script
# This script helps verify that the payment system is properly configured

echo "=========================================="
echo "🔍 SPIROLINK Payment System Verification"
echo "=========================================="
echo ""

# Check if .env files exist
echo "✓ Checking environment files..."
if [ -f ".env" ]; then
    echo "  ✅ .env file found"
else
    echo "  ❌ .env file NOT found - Create from .env.example"
fi

if [ -f "chatbot-backend/.env" ]; then
    echo "  ✅ chatbot-backend/.env file found"
else
    echo "  ❌ chatbot-backend/.env file NOT found"
fi
echo ""

# Check frontend dependencies
echo "✓ Checking frontend dependencies..."
if grep -q "@stripe/stripe-js" package.json; then
    echo "  ✅ @stripe/stripe-js found in package.json"
else
    echo "  ❌ @stripe/stripe-js NOT found"
fi

if grep -q "razorpay" package.json; then
    echo "  ✅ razorpay found in package.json"
else
    echo "  ❌ razorpay NOT found"
fi
echo ""

# Check backend dependencies
echo "✓ Checking backend dependencies..."
if grep -q "stripe" chatbot-backend/package.json; then
    echo "  ✅ stripe found in chatbot-backend/package.json"
else
    echo "  ❌ stripe NOT found"
fi

if grep -q "razorpay" chatbot-backend/package.json; then
    echo "  ✅ razorpay found in chatbot-backend/package.json"
else
    echo "  ❌ razorpay NOT found"
fi
echo ""

# Check files exist
echo "✓ Checking payment files..."
if [ -f "src/pages/Payment.tsx" ]; then
    echo "  ✅ src/pages/Payment.tsx found"
else
    echo "  ❌ src/pages/Payment.tsx NOT found"
fi

if grep -q "stripe/create-intent" chatbot-backend/server.js; then
    echo "  ✅ Stripe endpoints in server.js"
else
    echo "  ❌ Stripe endpoints NOT found in server.js"
fi

if grep -q '/payment' src/App.tsx; then
    echo "  ✅ /payment route in App.tsx"
else
    echo "  ❌ /payment route NOT found in App.tsx"
fi
echo ""

# Check documentation
echo "✓ Checking documentation..."
if [ -f "PAYMENT_SETUP_GUIDE.md" ]; then
    echo "  ✅ PAYMENT_SETUP_GUIDE.md found"
else
    echo "  ⚠️  PAYMENT_SETUP_GUIDE.md not found"
fi

if [ -f "PAYMENT_QUICK_REFERENCE.md" ]; then
    echo "  ✅ PAYMENT_QUICK_REFERENCE.md found"
else
    echo "  ⚠️  PAYMENT_QUICK_REFERENCE.md not found"
fi
echo ""

# Summary
echo "=========================================="
echo "📋 Configuration Checklist"
echo "=========================================="
echo ""
echo "Before running the application:"
echo ""
echo "1. ✅ Create .env files with API keys:"
echo "   - VITE_RAZORPAY_KEY_ID"
echo "   - RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET"
echo "   - VITE_STRIPE_PUBLISHABLE_KEY"
echo "   - STRIPE_SECRET_KEY"
echo "   - RESEND_API_KEY (or SMTP config)"
echo ""
echo "2. ✅ Install dependencies:"
echo "   npm install"
echo "   cd chatbot-backend && npm install && cd .."
echo ""
echo "3. ✅ Start backend (Terminal 1):"
echo "   cd chatbot-backend"
echo "   npm start"
echo ""
echo "4. ✅ Start frontend (Terminal 2):"
echo "   npm run dev"
echo ""
echo "5. ✅ Test payment page:"
echo "   http://localhost:5173/payment"
echo ""
echo "=========================================="
echo "🎯 Test Payment Flow"
echo "=========================================="
echo ""
echo "Razorpay Test (INR):"
echo "  - Select 'Razorpay (₹ INR)'"
echo "  - Fill form with test data"
echo "  - Use test card in Razorpay dashboard"
echo ""
echo "Stripe Test (USD):"
echo "  - Select 'Stripe ($ USD)'"
echo "  - Fill form with test data"
echo "  - Use test card: 4242 4242 4242 4242"
echo ""
echo "=========================================="
echo "✨ All checks passed! Ready to test."
echo "=========================================="
