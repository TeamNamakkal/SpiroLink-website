#!/bin/bash

# ============================================================================
# COMPLETE MIGRATION COMMANDS - COPY & PASTE
# ============================================================================
# Do these commands in order

echo "============================================================================"
echo "RENDER → RAILWAY DATABASE MIGRATION"
echo "============================================================================"
echo ""
echo "PREREQUISITES:"
echo "✓ Railway account created at https://railway.app"
echo "✓ PostgreSQL database created on Railway"
echo "✓ Connection credentials saved"
echo ""
echo "============================================================================"
echo ""

# STEP 1: Export from Render
echo "STEP 1️⃣: EXPORT DATABASE FROM RENDER"
echo "============================================================================"
echo "Run this command:"
echo ""
echo 'pg_dump "postgresql://spiro_postgres_user:wzKRSjnH7oSkcSoF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.oregon-postgres.render.com:5432/spiro_postgres" > render_backup.sql'
echo ""
echo "Expected: Creates render_backup.sql file (~few MB)"
echo "This takes 2-5 minutes depending on DB size"
echo ""
echo "============================================================================"
echo ""

# STEP 2: Get Railway credentials
echo "STEP 2️⃣: GET RAILWAY DATABASE CREDENTIALS"
echo "============================================================================"
echo "Go to: https://railway.app/dashboard"
echo "1. Select your PostgreSQL plugin"
echo "2. Click 'Connect' tab"
echo "3. Copy the PostgreSQL connection string"
echo ""
echo "It should look like:"
echo 'postgresql://postgres:random-password@railway-host:5432/railway'
echo ""
echo "Save this as RAILWAY_CONNECTION_URL"
echo ""
echo "============================================================================"
echo ""

# STEP 3: Import to Railway
echo "STEP 3️⃣: IMPORT DATABASE TO RAILWAY"
echo "============================================================================"
echo "Run this command (replace with your Railway credentials):"
echo ""
echo 'psql "postgresql://postgres:YOUR_PASSWORD@YOUR_RAILWAY_HOST:5432/railway" < render_backup.sql'
echo ""
echo "Expected: Takes 2-5 minutes, no errors"
echo "This imports all tables and data to Railway"
echo ""
echo "============================================================================"
echo ""

# STEP 4: Update environment
echo "STEP 4️⃣: UPDATE .ENV FILE"
echo "============================================================================"
echo "Open: chatbot-backend/.env"
echo ""
echo "Find this line:"
echo 'DATABASE_URL=postgresql://spiro_postgres_user:wzKRSjnH7oSkcSoF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.oregon-postgres.render.com:5432/spiro_postgres'
echo ""
echo "Replace with (using your Railway credentials):"
echo 'DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_RAILWAY_HOST:5432/railway'
echo ""
echo "============================================================================"
echo ""

# STEP 5: Test connection
echo "STEP 5️⃣: TEST CONNECTION"
echo "============================================================================"
echo "Run this command:"
echo ""
echo 'cd chatbot-backend && npm run test-railway'
echo ""
echo "Expected: All tests pass ✅"
echo "If fails: Check Railway credentials are correct"
echo ""
echo "============================================================================"
echo ""

# STEP 6: Deploy backend
echo "STEP 6️⃣: DEPLOY BACKEND TO RAILWAY"
echo "============================================================================"
echo "Option A - Using Railway CLI:"
echo "  railway login"
echo "  cd chatbot-backend"
echo "  railway link"
echo "  railway deploy"
echo ""
echo "Option B - Using GitHub Integration:"
echo "  1. Go to railway.app/dashboard"
echo "  2. New Service → Connect GitHub"
echo "  3. Select repository"
echo "  4. Add environment variables from .env"
echo "  5. Auto-deploys"
echo ""
echo "============================================================================"
echo ""

# STEP 7: Update frontend
echo "STEP 7️⃣: UPDATE FRONTEND"
echo "============================================================================"
echo "Open: chatbot-frontend/.env (or .env.production)"
echo ""
echo "Update:"
echo "  OLD: VITE_API_URL=http://localhost:5001"
echo "  NEW: VITE_API_URL=https://[your-railway-backend].railway.app"
echo ""
echo "Git push to redeploy on Render"
echo ""
echo "============================================================================"
echo ""

# STEP 8: Verify
echo "STEP 8️⃣: VERIFY EVERYTHING WORKS"
echo "============================================================================"
echo "Run these curl commands (replace with your Railway backend URL):"
echo ""
echo 'curl https://[your-railway-backend].railway.app/health'
echo 'curl https://[your-railway-backend].railway.app/api/users'
echo ""
echo "Expected: Success responses"
echo ""
echo "Check frontend:"
echo "  1. Open your Render frontend URL"
echo "  2. Open browser console (F12)"
echo "  3. Check Network tab for API calls"
echo "  4. Should see calls to Railway backend URL"
echo ""
echo "============================================================================"
echo ""

echo "✅ MIGRATION COMPLETE!"
echo ""
echo "Summary:"
echo "  • Database: Render → Railway ✓"
echo "  • Backend: Now on Railway ✓"
echo "  • Frontend: Still on Render ✓"
echo ""
echo "Next: Monitor for 24 hours, then delete old Render DB if all works"
echo ""
