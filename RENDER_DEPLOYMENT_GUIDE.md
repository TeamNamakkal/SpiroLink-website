# Deployment Guide - Render.com

## Quick Setup for Render

### 1. **Push Code to GitHub**
```bash
cd /Users/theepan/Documents/vs\ code/project
git add .
git commit -m "Add deployment guide"
git push origin theepan
```

### 2. **Create Render Web Service**
- Go to [render.com](https://render.com)
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select the branch (theepan)

### 3. **Configure Environment Variables in Render Dashboard**

Add these variables in Render dashboard under "Environment":

```
NODE_ENV=production
PORT=10000

OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE

SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=YOUR_GMAIL_HERE
SMTP_PASSWORD=YOUR_APP_PASSWORD_HERE
SMTP_FROM=YOUR_GMAIL_HERE
COMPANY_EMAIL=support@spirolink.com
```

### 4. **Build Settings**
- **Build Command:** `npm ci && npm run build`
- **Start Command:** `npm run start`

### 5. **Important Notes**
- Email functionality requires valid SMTP credentials
- OpenAI API key must be added for chatbot functionality
- Use environment variables, never commit secrets
- Test locally before deploying
