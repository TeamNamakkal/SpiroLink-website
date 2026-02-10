# Deployment Guide - Render.com

## Quick Setup for Render

### 1. **Push Code to GitHub**
```bash
cd /Users/theepan/Documents/vs\ code/project
git add .
git commit -m "Add deployment guide"
git push origin theepan
```

### 2. **Create Render Web Service (Unified)**
- Go to [render.com](https://render.com)
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select the branch (theepan)

This project is designed to run as ONE unified service on Render:
- Express serves the built frontend from `frontend/dist`
- Express also exposes `/api/*` routes (including `/api/contact`)

### 3. **Configure Environment Variables in Render Dashboard**

Add these variables in Render dashboard under "Environment" (on the unified service):

```
NODE_ENV=production

# IMPORTANT (Fixes: "vite: not found")
NPM_CONFIG_PRODUCTION=false

# Resend (server-side only)
RESEND_API_KEY=re_xxx...          # mark as Secret in Render

# Admin/company recipient for notifications
ADMIN_EMAIL=contact@spirolink.com
COMPANY_EMAIL=contact@spirolink.com

# Server port (Render injects PORT automatically, but this is fine to set explicitly)
PORT=10000

# Optional (if you use chatbot)
OPENAI_API_KEY=sk-proj_xxx...     # mark as Secret in Render

---

## Fix: "sh: 1: vite: not found" on Render

If your service runs `vite build`, Render must install `devDependencies` (where `vite` lives).
Setting `NPM_CONFIG_PRODUCTION=false` ensures `npm ci` installs devDependencies during build.
```

### 4. **Build Settings**
- **Build Command:** `npm ci && npm run build`
- **Start Command:** `npm run start`

### 5. **Important Notes**
- Email functionality requires valid SMTP credentials
- OpenAI API key must be added for chatbot functionality
- Use environment variables, never commit secrets
- Test locally before deploying
