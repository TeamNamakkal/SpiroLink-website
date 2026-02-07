# 🚀 Unified Single-Service Render Deployment

## New Project Structure

```
project/
├── package.json                 (ROOT - orchestrates build & start)
├── server.js                    (UNIFIED SERVER - serves frontend + backend)
├── vite.config.ts              (Frontend build config)
├── frontend/                     (React/Vite app - NEW)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── dist/                     (Built frontend - served by server)
│   ├── index.html
│   └── package.json
├── backend/                      (Node/Express server - NEW)
│   ├── package.json
│   ├── server.js                (API logic only)
│   └── node_modules/
└── node_modules/                (ROOT dependencies)
```

## How It Works

### 1. Build Phase (Render)
```bash
npm ci                           # Install root dependencies
npm run build:frontend           # Build React app → frontend/dist
npm run install:all              # Install backend dependencies
```

### 2. Start Phase (Render)
```bash
npm start                        # Start unified server on PORT
```

### 3. Server Routing
- **GET /api/health** → Backend health check
- **POST /api/chat** → OpenAI chatbot
- **POST /api/contact** → Email via Resend
- **GET *** → Serve index.html (React Router SPA)
- **Static files** → Serve frontend/dist assets

### 4. Frontend Calls
```javascript
// OLD (localhost - removed)
// fetch('http://localhost:5000/chat')

// NEW (relative paths - works everywhere)
fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message }) })
```

## Environment Variables (Render Dashboard)
```
NODE_ENV=production
PORT=10000
OPENAI_API_KEY=your_key_here
RESEND_API_KEY=your_key_here
```

## No More
- ❌ Multiple Render services
- ❌ Localhost URLs in code
- ❌ CORS issues
- ❌ Frontend/backend deployment conflicts
- ❌ Manual port management

## Yes To
- ✅ Single unified deployment
- ✅ Production-ready
- ✅ Simple environment setup
- ✅ Automatic frontend serving
- ✅ Proper API routing
