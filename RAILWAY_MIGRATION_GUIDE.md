# 🚀 RENDER TO RAILWAY DATABASE MIGRATION GUIDE

## Overview
Migrate your PostgreSQL database from Render to Railway while keeping your frontend on Render.

---

## ✅ Prerequisites
- [ ] Railway account (free tier available)
- [ ] PostgreSQL installed locally (`psql` command)
- [ ] Current Render database backup
- [ ] Access to your `.env` file

---

## 📋 Step 1: Create Railway PostgreSQL Database

### Via Railway Dashboard:
1. Go to https://railway.app
2. Login to your account
3. Click "New Project"
4. Add PostgreSQL plugin
5. Wait for provisioning (takes ~30 seconds)
6. Go to "Connect" tab to get credentials

### Credentials You'll Need:
```
- Host: [your-railway-host]
- Port: 5432
- Username: postgres
- Password: [random-password]
- Database: railway
```

---

## 📥 Step 2: Export Database from Render

### Quick Backup (Manual):
```bash
# This connects to Render and exports everything
pg_dump "postgresql://spiro_postgres_user:wzKRSjnH7oSkcSoF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.oregon-postgres.render.com:5432/spiro_postgres" > render_backup.sql
```

### Or Use the Automated Script:
```bash
cd chatbot-backend
chmod +x migrate-to-railway.sh
./migrate-to-railway.sh
```

---

## 📤 Step 3: Import Database to Railway

### Option A: Using psql Command
```bash
# First, create the backup file location
RAILWAY_DB_URL="postgresql://postgres:PASSWORD@HOST:PORT/railway"

# Import the backup
psql "$RAILWAY_DB_URL" < render_backup.sql
```

### Option B: Using Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Select your project
railway link

# Connect to Railway DB and import
cat render_backup.sql | railway db:query
```

### Option C: Through Railway Dashboard UI
1. Go to Railway Dashboard
2. Select your PostgreSQL plugin
3. Go to "Data" tab
4. Use the import feature to upload `render_backup.sql`

---

## 🔌 Step 4: Update Environment Variables

### Update `.env` in chatbot-backend:
```bash
# OLD (Render)
DATABASE_URL=postgresql://spiro_postgres_user:wzKRSjnH7oSkcSoF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.oregon-postgres.render.com:5432/spiro_postgres

# NEW (Railway)
DATABASE_URL=postgresql://postgres:YOUR_RAILWAY_PASSWORD@YOUR_RAILWAY_HOST:5432/railway
```

### Get Railway Connection String:
1. Go to Railway Dashboard → PostgreSQL Plugin
2. Click "Connect" → "PostgreSQL"
3. Copy the full connection string

---

## ✅ Step 5: Verify Database Migration

### Test Connection Script:
```bash
cd chatbot-backend
npm run test-db
```

### Manual Test:
```bash
# Test that data is in Railway
psql "$RAILWAY_DB_URL" -c "SELECT COUNT(*) FROM users;"
psql "$RAILWAY_DB_URL" -c "SELECT COUNT(*) FROM payments;"
psql "$RAILWAY_DB_URL" -c "SELECT COUNT(*) FROM invoices;"
```

### Expected Output:
- All tables should exist
- All data should be present
- No connection errors

---

## 🚀 Step 6: Deploy Backend to Railway

### Option A: Railway CLI
```bash
cd chatbot-backend
railway add

# Select Node.js environment
# Railway will auto-detect from package.json
```

### Option B: Via Railway Dashboard
1. Create new Railway Project
2. Add Service (select GitHub repo or upload)
3. Select branch
4. Add environment variables from `.env`
5. Deploy

---

## 🌐 Step 7: Keep Frontend on Render

### No Changes Needed!
Your frontend will stay on Render. Just ensure:

1. Update frontend `.env` to point to Railway backend:
```
VITE_API_URL=https://your-railway-backend.railway.app
```

2. Update CORS in backend `server.js`:
```javascript
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'https://your-render-frontend.onrender.com'
}));
```

---

## 🔍 Troubleshooting

### Connection Timeout
```bash
# Test Railway connection
telnet YOUR_RAILWAY_HOST 5432

# Verify credentials
psql "postgresql://postgres:PASSWORD@HOST:PORT/railway" -c "SELECT 1;"
```

### Missing Tables
```bash
# Check if tables were imported
psql "$RAILWAY_DB_URL" -c "\dt"

# If empty, re-import:
psql "$RAILWAY_DB_URL" < render_backup.sql
```

### Data Not Transferred
```bash
# Verify data in Railway
psql "$RAILWAY_DB_URL" -c "SELECT * FROM users LIMIT 5;"

# If empty, the import didn't work - repeat Step 3
```

---

## 📊 Architecture After Migration

```
┌─────────────────┐
│  Frontend       │
│  (Render)       │
│  onrender.com   │
└────────┬────────┘
         │ HTTPS
         │
┌────────▼────────┐
│  Backend        │
│  (Railway)      │
│  railway.app    │
└────────┬────────┘
         │
┌────────▼────────┐
│  PostgreSQL     │
│  (Railway)      │
│  railway        │
└─────────────────┘
```

---

## 💾 Backup & Rollback Plan

### Keep Render Database Active (First Week)
```bash
# Don't delete Render DB immediately
# Keep it as backup for 1-2 weeks while testing Railway
```

### If Issues - Rollback to Render
```bash
# Update .env back to Render URL
DATABASE_URL=postgresql://spiro_postgres_user:wzKRSjnH7oSkcSoF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.oregon-postgres.render.com:5432/spiro_postgres

# Restart backend
npm run start
```

---

## ✨ Next Steps

1. [ ] Create Railway PostgreSQL database
2. [ ] Note Railway connection credentials
3. [ ] Export Render database
4. [ ] Import to Railway
5. [ ] Update `.env` file
6. [ ] Test connection with `npm run test-db`
7. [ ] Update frontend API URL
8. [ ] Deploy backend to Railway
9. [ ] Test end-to-end
10. [ ] Monitor for 1 week
11. [ ] Delete Render database (optional, after verification)

---

## 📚 Useful Links

- Railway Docs: https://docs.railway.app
- PostgreSQL Export/Import: https://www.postgresql.org/docs/current/app-pgdump.html
- Railway Pricing: https://railway.app/pricing

---

**Questions?** Check the troubleshooting section or consult Railway documentation.
