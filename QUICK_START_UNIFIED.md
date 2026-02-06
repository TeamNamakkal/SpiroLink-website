# 🎯 QUICK START - Unified Deployment

## TL;DR

Your project is now **ONE** Render service instead of two.

## What You Need To Do RIGHT NOW

### 1. Update Frontend Code (CRITICAL)
Find all API calls and remove localhost:

```bash
# Find localhost references
grep -r "localhost" src/ src-pages/ src-components/
```

Replace these patterns:
```javascript
// ❌ REMOVE (localhost)
fetch('http://localhost:5000/chat')
fetch('http://localhost:5001/contact')
fetch('http://localhost:10000/api/health')

// ✅ USE (relative paths)
fetch('/api/chat')
fetch('/api/contact')
fetch('/api/health')
```

Use the new API client:
```typescript
import { chatAPI, contactAPI, healthAPI } from '@/lib/api';

// Chat
const { reply } = await chatAPI.send('Hello!');

// Contact
const result = await contactAPI.submit({
  name: 'John',
  email: 'john@example.com',
  message: 'Hello'
});

// Health
const status = await healthAPI.check();
```

### 2. Test Locally
```bash
# Build frontend
npm run build:frontend

# Start unified server
npm start

# Visit http://localhost:10000
```

### 3. Deploy to Render
```bash
git push origin theepan
```

Render auto-deploys with:
- Build: `npm run build`
- Start: `npm start`
- Port: 10000 (from env vars)

## API Endpoints

All endpoints are under `/api`:

```
GET    /api/health              # Server status
POST   /api/chat                # ChatGPT (needs OPENAI_API_KEY)
POST   /api/contact             # Email form (needs RESEND_API_KEY)
GET    /*                       # Frontend routes
```

## Environment Variables (Render)

```
NODE_ENV=production
PORT=10000
OPENAI_API_KEY=sk-proj-xxx...
RESEND_API_KEY=re_xxx...
```

## Files Changed

| File | Change |
|------|--------|
| `server.js` | Now serves frontend + backend |
| `package.json` | Updated build/start scripts |
| `vite.config.ts` | Builds to `frontend/dist` |
| `src/lib/api.ts` | New API client |

## Folder Structure

```
project/
├── server.js              ← Unified server
├── package.json           ← Root config
├── frontend/dist/         ← Built app (served by server)
├── chatbot-backend/       ← API logic
└── src/lib/api.ts         ← New API client
```

## Common Issues

| Issue | Fix |
|-------|-----|
| API returns 404 | Make sure frontend uses `/api/...` paths |
| Chat not working | Set OPENAI_API_KEY in Render |
| Email not working | Set RESEND_API_KEY in Render |
| Frontend not loading | Verify `npm run build:frontend` creates `frontend/dist` |

## Test Endpoints

```bash
# Health check
curl https://your-domain.onrender.com/api/health

# Chat
curl -X POST https://your-domain.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'

# Contact
curl -X POST https://your-domain.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John",
    "email":"john@example.com",
    "message":"Hi"
  }'
```

## Done! 🎉

Your project now deploys as a **single unified Render service** with:
- ✅ Frontend + Backend together
- ✅ No localhost hardcoding
- ✅ Single PORT
- ✅ Automatic deployments
- ✅ Production ready

Read the full guides for details:
- [UNIFIED_DEPLOYMENT_SUMMARY.md](./UNIFIED_DEPLOYMENT_SUMMARY.md)
- [RENDER_DEPLOYMENT_CHECKLIST.md](./RENDER_DEPLOYMENT_CHECKLIST.md)
- [FRONTEND_API_UPDATES.md](./FRONTEND_API_UPDATES.md)
