# 🎯 DEPLOYMENT ARCHITECTURE: RAILWAY + RENDER

## Current Setup
- **Database**: Render PostgreSQL → **Moving to Railway**
- **Backend**: Currently local/dev → **Deploy to Railway**
- **Frontend**: Render → **Stays on Render**

---

## 🔧 Configuration Changes Required

### 1. Backend `.env` (chatbot-backend/.env)

Update DATABASE_URL only:
```diff
# OLD
- DATABASE_URL=postgresql://spiro_postgres_user:wzKRSjnH7oSkcSoF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.oregon-postgres.render.com:5432/spiro_postgres

# NEW (after creating Railway DB)
+ DATABASE_URL=postgresql://postgres:[PASSWORD]@[RAILWAY-HOST]:5432/railway
```

Keep all other environment variables the same!

---

### 2. Frontend `chatbot-frontend/.env` (or .env.production)

```bash
# Point to Railway backend
VITE_API_URL=https://your-railway-backend-url.railway.app

# Keep other configs
VITE_STRIPE_PUBLISHABLE_KEY=[your-key]
```

---

### 3. Backend CORS Configuration

Update `chatbot-backend/server.js` (around line 23):

```javascript
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'https://your-render-frontend.onrender.com'
}));
```

Add to `chatbot-backend/.env`:
```
FRONTEND_URL=https://your-render-frontend.onrender.com
```

---

## 📤 Deployment Order

### Phase 1: Database Migration (No Downtime)
1. Create Railway PostgreSQL database
2. Export Render database
3. Import to Railway
4. Test Railway connection locally
5. Keep Render DB as backup

### Phase 2: Deploy Backend
1. Create Railway account & link repo
2. Add environment variables
3. Deploy backend service
4. Test backend health checks
5. Test payment flows

### Phase 3: Update Frontend
1. Update frontend `.env` with Railway backend URL
2. Rebuild on Render
3. Test end-to-end flows

---

## 🚀 Railway Backend Deployment (4 Steps)

### Step 1: Create Service on Railway
```bash
# Option A: Via Railway CLI
railway login
cd chatbot-backend
railway init
railway add

# Option B: Via Dashboard
# Go to railway.app → New Project → Deploy from GitHub
```

### Step 2: Add Environment Variables
```bash
# In Railway Dashboard:
# 1. Go to your service
# 2. Variables tab
# 3. Add all from chatbot-backend/.env:

DATABASE_URL=postgresql://postgres:...@railway...
PORT=5001
NODE_ENV=production
OPENAI_API_KEY=sk-proj-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
FRONTEND_URL=https://your-render-frontend.onrender.com
```

### Step 3: Deploy
```bash
# Option A: Railway CLI
railway deploy

# Option B: GitHub integration (auto-deploy on push)
# Enable GitHub integration in Railway dashboard
```

### Step 4: Get Backend URL
```bash
# After deployment:
# Your backend URL: https://[random-name].railway.app
# Copy this for frontend configuration
```

---

## ✅ Verification Checklist

After deployment:

```bash
# 1. Test backend is running
curl https://[your-railway-backend].railway.app/health

# 2. Test database connection
curl https://[your-railway-backend].railway.app/api/test-connection

# 3. Test payment endpoint
curl -X POST https://[your-railway-backend].railway.app/api/payment

# 4. Test auth endpoint
curl https://[your-railway-backend].railway.app/api/auth/health

# 5. Frontend: Check for CORS errors in browser console
# Should see successful API calls to Railway backend
```

---

## 🔄 Rollback Plan

If issues occur:

### Quick Rollback
1. Update `.env` back to Render database
2. Restart services
3. Troubleshoot issue
4. Re-deploy

### Delete Services
```bash
# Keep both running for 24 hours first
# Then decide based on monitoring:

# After confirmed working:
# - Delete old Render backend (if running there)
# - Delete Render database (keep for 1 week more)
# - Keep Render frontend running
```

---

## 📊 Final Architecture

```
FRONTEND (Render)
  ├─ https://project-name.onrender.com
  ├─ Environment: VITE_API_URL = Railway backend
  └─ Auto-deploys on git push

BACKEND (Railway)
  ├─ https://[service].railway.app
  ├─ Environment: DATABASE_URL = Railway PostgreSQL
  └─ Auto-deploys on git push

DATABASE (Railway PostgreSQL)
  ├─ Host: [railway-host]
  ├─ Tables: users, payments, invoices, payment_logs
  └─ Backup: Stored in Render (for safety)
```

---

## ⚡ Cost Estimate

- **Railway PostgreSQL**: $5-20/month (depends on usage)
- **Railway Backend**: $5-20/month (depends on usage)
- **Render Frontend**: Free (hobby tier) or paid
- **Total**: Much cheaper than all on Render!

---

## 🎬 Next Actions

1. Go to https://railway.app
2. Create PostgreSQL database
3. Copy connection credentials
4. Follow RAILWAY_MIGRATION_GUIDE.md for database transfer
5. Deploy backend following this guide
6. Update frontend URL
7. Test everything
8. Monitor for 24 hours
9. Keep Render DB backup for 1 week
10. Delete old services once confirmed working

**Need help with any step? Check the detailed RAILWAY_MIGRATION_GUIDE.md**
