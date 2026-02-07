# 🔧 Render Deployment Configuration

## Render Web Service Setup

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

### Environment Variables
```
NODE_ENV=production
PORT=10000
OPENAI_API_KEY=sk-proj-your-key-here
RESEND_API_KEY=re_your-key-here
```

---

## Build Process Breakdown

When you push to GitHub, Render runs:

### 1. Install Dependencies
```bash
npm ci  # Render installs root dependencies using package-lock.json
```

### 2. Build Command (npm run build)
```bash
npm run build:frontend
├─ vite build --outDir frontend/dist
│  └─ Builds React app to frontend/dist/
│
npm run install:backend
└─ cd chatbot-backend && npm install
   └─ Installs backend dependencies (uses backend's package-lock.json)
```

### 3. Start Command (npm start)
```bash
node server.js
├─ Serves frontend/dist/* as static files
├─ Routes /api/* to backend handlers
└─ Listens on PORT (10000)
```

---

## Why npm ci → npm install Change

| Step | Issue | Solution |
|------|-------|----------|
| `npm ci` in root | Strict version locking | ✅ Works - Render uses this |
| `npm ci` in backend | Double-locking conflict | ❌ Fails - package-lock mismatch |
| `npm install` in backend | Flexible, uses existing lock | ✅ Works - respects package-lock.json |

---

## File Structure on Render

```
/app/                               (Render working directory)
├── node_modules/                   (Root dependencies)
├── package.json                    (Root config)
├── package-lock.json               (Root lock file)
├── server.js                       (Main server)
├── vite.config.ts
│
├── frontend/
│   ├── dist/                       (✅ Built app served by server)
│   │   ├── index.html
│   │   ├── assets/
│   │   └── ...
│   ├── src/
│   └── package.json
│
├── chatbot-backend/
│   ├── node_modules/               (Backend dependencies)
│   ├── package.json
│   ├── package-lock.json           (Backend lock file)
│   ├── server.js
│   └── ...
│
└── [build artifacts]
```

---

## Render Dashboard Settings

### Web Service Configuration

**Name:** `spirolink-unified`

**Build**
- Build Command: `npm run build`
- Start Command: `npm start`

**Environment**
- `NODE_ENV` = `production`
- `PORT` = `10000`
- `OPENAI_API_KEY` = `sk-proj-xxx...`
- `RESEND_API_KEY` = `re_xxx...`

**Deployment**
- Branch: `theepan`
- Auto-deploy: `Yes`

---

## Deployment Steps

### 1. Ensure All Changes are Committed
```bash
cd "/Users/theepan/Documents/vs code/project"
git status  # Should show clean working tree
```

### 2. Push to GitHub
```bash
git push origin theepan
```

### 3. Render Auto-Deploys
- Watches `theepan` branch
- Triggers build on push
- Runs `npm run build`
- Starts `npm start`

### 4. Verify Deployment
```bash
# Check if service is running
curl https://spirolink.onrender.com/api/health

# Should return:
{
  "status": "OK",
  "service": "SPIROLINK",
  "environment": "production",
  "openaiConfigured": true,
  "emailConfigured": true
}
```

---

## Troubleshooting

### Build Fails with "npm ERR!"
- Check Render logs for exact error
- Verify `npm run build:frontend` works locally
- Ensure `frontend/dist` is created

### "Cannot find module 'express'"
- Backend dependencies not installed
- Check: `cd chatbot-backend && npm install`
- Verify `chatbot-backend/package.json` exists

### Frontend Returns 404
- Check if `frontend/dist/index.html` was created
- Verify `npm run build:frontend` output in logs
- Server.js path might be wrong

### Port Already in Use
- PORT should come from environment variable
- In server.js: `const PORT = process.env.PORT || 10000;`
- Render sets PORT automatically

### API Endpoints Return 404
- Verify endpoints are `/api/chat`, `/api/contact`, `/api/health`
- Frontend should use `/api/...` paths (not localhost)
- Check server.js routes are correct

---

## Files Modified for Render

✅ **package.json**
- Changed: `"install:backend": "cd chatbot-backend && npm ci"`
- To: `"install:backend": "cd chatbot-backend && npm install"`
- Reason: Avoid double npm-lock conflicts during build

✅ **server.js**
- Uses `process.env.PORT` (set by Render)
- Serves `frontend/dist/*`
- Routes `/api/*` to backend

✅ **vite.config.ts**
- Builds to `frontend/dist`
- Dev proxy to `/api`

---

## Render Logs to Check

After deployment, Render dashboard shows:

```
Build logs:
✓ npm ci (installs root)
✓ npm run build:frontend (vite builds to frontend/dist)
✓ npm run install:backend (installs backend/node_modules)

Start logs:
✓ node server.js (starts on PORT 10000)
✓ Serving frontend from: /app/frontend/dist
✓ Ready for requests
```

---

## Production Checklist

- [ ] `npm run build` works locally
- [ ] Frontend builds to `frontend/dist/`
- [ ] Backend dependencies install with `npm install`
- [ ] `npm start` runs without errors
- [ ] All frontend code uses `/api/...` (no localhost)
- [ ] Environment variables set in Render
- [ ] Package-lock.json files committed to git
- [ ] No `http://localhost` in frontend code
- [ ] server.js uses `process.env.PORT`
- [ ] All secrets in Render env (never in code)

---

## Commands Quick Reference

**Local Development:**
```bash
npm run build:frontend      # Build frontend
npm start                   # Run unified server
```

**Production:**
```bash
git push origin theepan     # Deploy to Render
curl https://your-domain/api/health  # Test
```

