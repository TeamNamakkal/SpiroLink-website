# ⚡ QUICK START: RENDER → RAILWAY MIGRATION

## 🎯 Your Goal
- Move PostgreSQL database from **Render** to **Railway**
- Keep frontend on **Render**
- Deploy backend to **Railway**

---

## ⏱️ Quick Checklist (Do This Now)

### Phase 1: Railway Setup (15 min)
- [ ] Go to https://railway.app
- [ ] Create account / login
- [ ] Create new project
- [ ] Add PostgreSQL plugin
- [ ] Wait for database creation
- [ ] Go to "Connect" tab
- [ ] Copy connection string:
  ```
  postgresql://postgres:[PASSWORD]@[HOST]:5432/railway
  ```
  Save this somewhere!

---

### Phase 2: Export Render Database (10 min)
```bash
cd chatbot-backend

# Run this command (you might need to install postgresql first)
pg_dump "postgresql://spiro_postgres_user:wzKRSjnH7oSkcSoF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.oregon-postgres.render.com:5432/spiro_postgres" > render_backup.sql

# Should create render_backup.sql file
```

**Mac users:** If `pg_dump` not found:
```bash
brew install postgresql
```

---

### Phase 3: Import to Railway (10 min)
```bash
# Use the connection string from Railway
# Replace with your actual Railway credentials
psql "postgresql://postgres:YOUR_PASSWORD@YOUR_RAILWAY_HOST:5432/railway" < render_backup.sql
```

Or use Railway CLI:
```bash
npm i -g @railway/cli
railway login
cat render_backup.sql | railway db:query
```

---

### Phase 4: Update Environment (5 min)
In `chatbot-backend/.env`:
```bash
# Replace the old Render URL with Railway URL
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_RAILWAY_HOST:5432/railway
```

Test it:
```bash
cd chatbot-backend
npm run test-railway
```

---

### Phase 5: Deploy Backend to Railway (15 min)

**Via Railway CLI (Easiest):**
```bash
cd chatbot-backend
railway link           # Select your Railway project
railway deploy        # Deploys backend
railway variables set # Add .env variables
```

Or via Railway Dashboard:
1. Go to https://railway.app/dashboard
2. New Service → Connect your GitHub repo
3. Select `chatbot-backend` directory
4. Add all environment variables
5. Deploy

---

### Phase 6: Update Frontend (5 min)
In `chatbot-frontend/.env`:
```bash
# Point to your Railway backend
VITE_API_URL=https://[your-railway-service].railway.app
```

Render will auto-redeploy on git push.

---

## ✅ Verification (2 min)
```bash
# Test Railway backend is running
curl https://[your-railway-service].railway.app/health

# Check frontend can reach backend
# Open browser console and check Network tab for API calls
```

---

## 📁 Files Created for You
- ✅ `RAILWAY_MIGRATION_GUIDE.md` - Detailed step-by-step guide
- ✅ `RAILWAY_DEPLOYMENT_GUIDE.md` - Architecture & deployment setup
- ✅ `migrate-to-railway.sh` - Automated backup script
- ✅ `test-railway-connection.js` - Connection verification script

---

## ⚠️ Important Notes

1. **Keep Render DB for 1 week** - As backup
2. **Test thoroughly** - Before deleting old DB
3. **Monitor both** - Keep eye on both services for 24h
4. **Keep old .env** - In case you need to rollback

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| `pg_dump: command not found` | `brew install postgresql` |
| Connection timeout | Check Railway credentials are correct |
| Tables not imported | Run `psql [url] < render_backup.sql` again |
| CORS errors | Update FRONTEND_URL in backend .env |
| Backend not deploying | Check all env vars are set in Railway |

---

## 🚀 Next Step
Start with Phase 1 above - create Railway PostgreSQL database!

Questions? Check the detailed guides:
- Full migration: `RAILWAY_MIGRATION_GUIDE.md`
- Deployment setup: `RAILWAY_DEPLOYMENT_GUIDE.md`

**Good luck! You got this! 💪**
