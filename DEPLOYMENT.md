# Deployment Guide for Academic Damage Control

## Quick Start

The Academic Damage Control app is built with Next.js and can be deployed to various platforms. Below are guides for popular options.

---

## 🚀 Vercel (Easiest - Recommended)

Vercel is the official Next.js hosting platform and makes deployment seamless.

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/academic-damage-control.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository and click "Import"

### Step 3: Configure Environment Variables
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### Step 4: Deploy
Click "Deploy" - Vercel will automatically build and deploy your app!

### Automatic Deployments
Any push to `main` branch will trigger automatic deployment.

---

## 🐳 Docker Deployment

For self-hosted servers or cloud platforms (AWS, DigitalOcean, etc.).

### Step 1: Create Dockerfile
Already included in project. Uses Node 18 Alpine for small image size.

### Step 2: Build Docker Image
```bash
docker build -t academic-damage-control:latest .
```

### Step 3: Create .env File
```bash
# In production server
cat > .env.production << EOF
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GOOGLE_AI_API_KEY=your_google_ai_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
EOF
```

### Step 4: Run Container
```bash
docker run -d \
  --name adc-app \
  -p 3000:3000 \
  --env-file .env.production \
  academic-damage-control:latest
```

### Step 5: Setup Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 6: Enable HTTPS
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## ☁️ AWS EC2 Deployment

### Prerequisites
- AWS account with EC2 access
- EC2 instance (Ubuntu 20.04 or later)
- Elastic IP or domain configured

### Step 1: SSH into Instance
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

### Step 2: Install Dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm git nginx
```

### Step 3: Clone Repository
```bash
git clone https://github.com/your-username/academic-damage-control.git
cd academic-damage-control
```

### Step 4: Install Node Packages
```bash
npm install
npm run build
```

### Step 5: Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with production values
nano .env.local
```

### Step 6: Setup PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 start npm --name "adc-app" -- start
pm2 startup
pm2 save
```

### Step 7: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/default
```

Add configuration above, then:
```bash
sudo systemctl restart nginx
```

### Step 8: Enable SSL
```bash
sudo certbot --nginx -d your-domain.com
```

---

## 🟦 DigitalOcean App Platform

### Step 1: Connect GitHub
1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Click "Create" → "Apps"
3. Connect your GitHub account
4. Select the repository

### Step 2: Configure
- **Name**: academic-damage-control
- **Build command**: `npm run build`
- **Run command**: `npm start`
- **HTTP port**: 3000

### Step 3: Add Environment Variables
In App settings, add:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
GOOGLE_AI_API_KEY
NEXT_PUBLIC_APP_URL (your DigitalOcean app URL)
NODE_ENV=production
```

### Step 4: Deploy
Click "Create App" - DigitalOcean will deploy automatically!

---

## 🟨 Heroku Deployment (Deprecated)

Heroku's free tier has been removed, but if using paid plans:

### Procfile
```
web: npm start
```

### Deploy
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set NEXT_PUBLIC_SUPABASE_URL=your_url
# ... set other env vars
```

---

## 🔐 Production Security Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Supabase RLS policies enabled
- [ ] Supabase database backups enabled
- [ ] HTTPS/SSL certificate installed
- [ ] CORS properly configured
- [ ] Rate limiting enabled on API routes
- [ ] API keys rotated
- [ ] Database credentials secure
- [ ] Error logging configured
- [ ] Monitoring and alerts setup

---

## 📊 Monitoring & Maintenance

### Application Logs

**Vercel**:
- Dashboard → Deployments → Logs

**Docker/Self-hosted**:
```bash
docker logs -f adc-app
pm2 logs adc-app
```

### Database Backups

**Supabase**:
1. Dashboard → Database → Backups
2. Enable automated backups (free tier: daily)

### Performance Monitoring

**Vercel Analytics** (optional):
```bash
npm install @vercel/analytics
```

Then in `layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🚨 Troubleshooting Deployment Issues

### "Cannot find module"
```bash
npm install
npm run build
```

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Supabase connection timeout
- Verify URL and key are correct
- Check Supabase project is active
- Ensure IP is whitelisted (if applicable)
- Check database connection limits

### Environment variables not loading
- Verify variables are set in deployment platform
- Restart application after changing variables
- Check for typos in variable names
- Ensure `NEXT_PUBLIC_*` prefix for client-side vars

### Build fails with TypeScript errors
```bash
# Type check locally
npx tsc --noEmit

# Fix errors then deploy
git push
```

---

## 📈 Scaling Considerations

### Current Architecture
- Stateless Next.js application (can run multiple instances)
- Supabase handles database scaling
- API routes auto-scale on Vercel

### For High Traffic

**Database**:
- Upgrade Supabase plan
- Enable read replicas
- Implement caching (Redis)

**API**:
- Implement rate limiting
- Add queue system for long-running tasks
- Cache API responses

**Frontend**:
- Vercel handles scaling automatically
- Consider CDN for large files
- Optimize images with Next.js Image

---

## 💰 Cost Estimation (Monthly)

| Service | Free/Tier | Cost |
|---------|-----------|------|
| Vercel | 50GB bandwidth | Free |
| Supabase | 500MB DB + 1GB bandwidth | Free |
| Google Gemini AI | First 1M tokens | Free |
| Domain | - | ~$10-15 |
| **Total** | - | ~$10-15 |

**Scaling costs** (if popular):
- Supabase Pro: $25/month
- Google Gemini: Pay per token (~$0.075/M input tokens)
- Vercel Pro: $20/month (for higher limits)

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      - run: npm run lint
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Supabase Hosting**: https://supabase.com/docs/guides/hosting
- **Docker**: https://docs.docker.com
- **Nginx**: https://nginx.org/en/docs/

---

**Remember**: Start with Vercel for simplicity and free tier benefits. Only move to self-hosting if you need more control or have specific requirements.

Good luck with your deployment! 🚀