# Quick Start Guide - Academic Damage Control

Get up and running in 5 minutes! 🚀

## Prerequisites Check
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Code editor (VS Code recommended)
- [ ] Supabase account (free at supabase.com)
- [ ] Google AI API key (free at ai.google.dev)

---

## ⚡ 5-Minute Setup

### 1. Clone/Download Project
```bash
# Navigate to project folder
cd academic-damage-control
```

### 2. Install Dependencies
```bash
npm install
```
⏱️ Takes 2-3 minutes

### 3. Setup Environment
```bash
# Copy example config
cp .env.example .env.local

# Edit with your keys
# Open .env.local and add:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY  
# - GOOGLE_AI_API_KEY
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in Browser
Navigate to: **http://localhost:3000**

✅ Done! You're running the app!

---

## 📚 What Each Page Does

| Page | URL | Purpose |
|------|-----|---------|
| Landing | `/` | Homepage with features |
| Dashboard | `/dashboard` | Main hub, quick access to tools |
| Planner | `/planner` | AI exam study plan generator |
| PYQ Analyzer | `/pyq-analyzer` | Analyze previous year papers |
| Night Mode | `/night-mode` | Last-minute revision tools |
| Settings | `/settings` | User preferences |

---

## 🛠️ Available Commands

```bash
# Development
npm run dev           # Start development server

# Production
npm run build         # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Check for lint errors
npm run format       # Format code (if configured)

# Database
# See database/schema.sql for Supabase setup
```

---

## 🔑 Getting Your API Keys

### Supabase
1. Go to supabase.com and sign up
2. Create new project
3. Go to Settings → API
4. Copy `Project URL` and `anon public key`
5. Paste into `.env.local`

### Google Generative AI
1. Go to ai.google.dev
2. Click "Get API Key"
3. Create new API key
4. Paste into `.env.local`

---

## 📁 Key Files to Know

- `src/app/page.tsx` - Landing page (edit here to customize)
- `src/app/layout.tsx` - Root layout (colors, fonts)
- `src/components/ui/` - Reusable UI components
- `src/app/api/` - Backend API routes
- `database/schema.sql` - Database structure
- `.env.example` - Environment variables template
- `README.md` - Full documentation
- `ARCHITECTURE.md` - Technical details

---

## 🎨 Customizing the App

### Change Colors
Edit `src/app/globals.css`:
```css
:root {
  --primary: #3b82f6;      /* Blue */
  --secondary: #10b981;    /* Emerald */
  --accent: #6366f1;       /* Indigo */
}
```

### Change Landing Page Copy
Edit `src/app/page.tsx`:
- Update heading text
- Modify feature descriptions
- Adjust button labels

### Add New Page
1. Create folder: `src/app/newpage/`
2. Create file: `src/app/newpage/page.tsx`
3. Navigation updates automatically!

---

## 🗄️ Database Setup (One-Time)

### Step 1: Create Supabase Project
1. Go to supabase.com
2. Click "New Project"
3. Follow prompts to create

### Step 2: Run Schema
1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy content from `database/schema.sql`
4. Paste and click "Run"

### Step 3: Verify Tables
Go to "Table Editor" and confirm these tables exist:
- exams
- study_plans
- pyq_uploads
- notes
- night_mode_sessions
- energy_logs
- user_profiles

✅ Database is ready!

---

## 🐛 Common Issues & Fixes

### "npm not found"
```bash
# Install Node.js from nodejs.org
# Then retry: npm install
```

### "Cannot find module 'next'"
```bash
npm install
npm run dev
```

### "Environment variable not set"
1. Check `.env.local` exists
2. Verify correct variable names
3. Restart development server
4. Clear browser cache

### Page shows "Error"
1. Check browser console (F12)
2. Check terminal output
3. Verify Supabase is connected
4. Check API keys are valid

---

## 📖 Learning Resources

### Relevant Docs
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Guide](https://supabase.com/docs)
- [Google Generative AI](https://ai.google.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Useful Commands
```bash
# Format code
npx prettier --write .

# Check TypeScript
npx tsc --noEmit

# Clear build cache
rm -rf .next

# Fresh install
rm -rf node_modules && npm install
```

---

## 🚀 Next Steps

After setup:

1. **Test the app**
   - Visit http://localhost:3000
   - Click through all pages
   - Test Planner form

2. **Add your content**
   - Customize landing page
   - Update colors/branding
   - Add more features

3. **Deploy**
   - See DEPLOYMENT.md for guides
   - Recommend: Vercel (easiest)
   - Takes 5 minutes with Vercel

4. **Monitor**
   - Check app performance
   - Review user feedback
   - Iterate on features

---

## 📞 Need Help?

- Check `README.md` for full documentation
- Review `ARCHITECTURE.md` for technical details
- See `DEPLOYMENT.md` for hosting options
- Check GitHub Issues (if applicable)
- Review code comments in relevant files

---

## 🎯 Project Structure Quick Reference

```
academic-damage-control/
├── src/
│   ├── app/              # Pages and API routes
│   ├── components/       # UI components
│   ├── lib/              # Utilities and configs
│   └── types/            # TypeScript types
├── database/
│   └── schema.sql        # Database schema
├── .env.example          # Environment template
├── README.md             # Full documentation
├── ARCHITECTURE.md       # Technical details
└── DEPLOYMENT.md         # Deployment guide
```

---

## ✨ Pro Tips

- Use `npm run dev` in development (auto-reload)
- Press F12 to open browser DevTools
- Check terminal for error messages
- Use TypeScript for type safety
- Test on mobile with `npm run dev` then open on phone

---

**You're all set! Start building and creating an amazing exam survival tool!** 💪

For detailed information, see:
- Full docs: `README.md`
- Architecture: `ARCHITECTURE.md`
- Deployment: `DEPLOYMENT.md`