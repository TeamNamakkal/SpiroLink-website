# ✅ Render Deployment Checklist

## Step 1: Local Testing
- [ ] Run `npm install` (root)
- [ ] Run `cd chatbot-backend && npm install`
- [ ] Run `npm run build:frontend` (builds to frontend/dist)
- [ ] Run `npm start` (test unified server)
- [ ] Open http://localhost:10000
- [ ] Test chat endpoint: `POST /api/chat`
- [ ] Test contact endpoint: `POST /api/contact`
- [ ] Verify frontend loads correctly

## Step 2: Update All Frontend API Calls
- [ ] Search project for `http://localhost:` and remove all
- [ ] Update all fetch calls to use `/api/...` paths
- [ ] Example: `fetch('/api/chat')` instead of `fetch('http://localhost:5000/chat')`
- [ ] Test frontend components locally

## Step 3: Create/Update .env.production
```
NODE_ENV=production
PORT=10000
OPENAI_API_KEY=your_openai_key
RESEND_API_KEY=your_resend_key
```

## Step 4: Deploy to Render
1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "🚀 Unified single-service deployment"
   git push origin theepan
   ```

2. Go to render.com → Create New Web Service
3. Select your GitHub repository
4. Select branch: `theepan`
5. Configure:
   - **Name:** spirolink-unified
   - **Runtime:** Node
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     ```
     NODE_ENV=production
     PORT=10000
     OPENAI_API_KEY=sk-proj-xxx...
     RESEND_API_KEY=re_xxx...
     ```

6. Click **Deploy**
7. Wait 2-3 minutes for build to complete
8. Test endpoints:
   - https://spirolink-unified.onrender.com/
   - https://spirolink-unified.onrender.com/api/health
   - POST https://spirolink-unified.onrender.com/api/chat

## Step 5: Verify Production
- [ ] Frontend loads at https://your-domain.onrender.com
- [ ] Chat works (if OPENAI_API_KEY set)
- [ ] Contact form works (if RESEND_API_KEY set)
- [ ] No console errors
- [ ] Check Render logs for errors

## What Happens on Render

### Build Phase
```
npm run build
├── npm run build:frontend    → vite build → frontend/dist
└── npm run install:backend   → cd chatbot-backend && npm ci
```

### Start Phase
```
npm start
└── node server.js
    ├── Serves frontend/dist/* as static files
    ├── Serves /api/... routes
    └── Listens on PORT (from env vars)
```

## Key Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NODE_ENV` | Set to `production` | Yes |
| `PORT` | Server port (10000) | Yes |
| `OPENAI_API_KEY` | ChatGPT API key | Optional (chatbot disabled if missing) |
| `RESEND_API_KEY` | Email service API key | Optional (email disabled if missing) |

## Troubleshooting

### Build fails
- Check logs for `npm run build:frontend` errors
- Ensure TypeScript compiles: `npm run typecheck`

### Frontend doesn't load
- Verify `npm run build:frontend` creates `frontend/dist/index.html`
- Check server logs: `frontend not found` error

### API calls 404
- Verify endpoints are `/api/chat`, `/api/contact`, `/api/health`
- Check frontend code - remove all `http://localhost` URLs
- Use relative paths: `/api/...`

### Email/Chat not working
- Verify environment variables are set in Render dashboard
- Check Render logs for API key errors
- Test with: `curl https://your-domain.onrender.com/api/health`

## File Structure After Build

```
project/
├── server.js                    ← Root server (unified)
├── package.json                 ← Root packages + scripts
├── vite.config.ts              ← Frontend build config (→ frontend/dist)
├── frontend/
│   ├── dist/                    ← Built React app (served by server.js)
│   │   ├── index.html
│   │   ├── assets/
│   │   └── ...
│   ├── src/
│   ├── index.html
│   └── package.json
├── chatbot-backend/
│   ├── node_modules/            ← Backend dependencies
│   ├── package.json
│   ├── server.js
│   └── ...
└── node_modules/                ← Root dependencies (express, cors, etc.)
```

## One-Line Deploy

```bash
git push origin theepan  # Render auto-deploys when you push
```

That's it! Render will:
1. Run `npm run build` (builds frontend, installs backend)
2. Run `npm start` (starts unified server)
3. Expose on PORT 10000
