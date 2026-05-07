# Academic Damage Control - Architecture & Setup Guide

## 🎯 Project Overview

**Academic Damage Control** is an AI-powered exam survival assistant designed for overwhelmed college students. Rather than a traditional productivity app, it's a realistic, low-pressure tool that acknowledges students may be behind on preparation, experiencing burnout, or facing last-minute exam panic.

### Core Philosophy
- **No Productivity Guilt**: This tool exists to help students survive, not to make them feel bad
- **Energy-Aware Planning**: Adjusts recommendations based on actual energy levels (Dead → Locked In)
- **Realistic Survival Focus**: Goal is to help pass exams, not achieve perfection
- **Mobile-First**: Optimized for studying on phones and tablets

---

## 📁 Project Structure

```
academic-damage-control/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout (dark mode)
│   │   ├── globals.css               # Global styles & theme
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Main dashboard
│   │   ├── planner/
│   │   │   └── page.tsx              # Exam survival planner
│   │   ├── pyq-analyzer/
│   │   │   └── page.tsx              # PYQ analysis tool
│   │   ├── night-mode/
│   │   │   └── page.tsx              # Night-before exam mode
│   │   ├── settings/
│   │   │   └── page.tsx              # User settings
│   │   └── api/                      # API routes
│   │       ├── planner/
│   │       │   └── route.ts          # Study plan generation
│   │       ├── pyq/
│   │       │   └── route.ts          # PYQ analysis
│   │       ├── explain/
│   │       │   └── route.ts          # Text simplification
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx            # Button component
│   │   │   ├── Input.tsx             # Input component
│   │   │   ├── Textarea.tsx          # Textarea component
│   │   │   ├── Card.tsx              # Card container
│   │   ├── forms/                    # Form components
│   │   ├── charts/                   # Chart components
│   │   ├── Navigation.tsx            # Navigation bar
│   │   └── ExplainSimplifier.tsx     # AI text simplifier
│   ├── lib/
│   │   ├── supabase.ts               # Supabase client setup
│   │   ├── ai.ts                     # AI utility functions
│   │   └── utils.ts                  # Utility functions
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   └── hooks/
│       └── (custom hooks directory)
├── database/
│   └── schema.sql                    # PostgreSQL schema for Supabase
├── public/
│   └── (static assets)
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment (create from .env.example)
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript config
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind CSS config
└── README.md                         # This file
```

---

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3b82f6` (Focus topics, main actions)
- **Secondary Emerald**: `#10b981` (Success, achievements)
- **Accent Indigo**: `#6366f1` (Highlights, important info)
- **Background Dark**: `#0f172a` (Slate-900, dark mode default)
- **Text Light**: `#f1f5f9` (Slate-100, good contrast)

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm (640px), md (768px), lg (1024px), xl (1280px)`
- Soft animations and transitions
- Touch-friendly buttons and inputs

### UI Components
All reusable components in `src/components/ui/`:
- **Button**: Multiple variants (primary, secondary, outline)
- **Input**: Text input with validation
- **Textarea**: Multi-line text input
- **Card**: Content container with borders

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16+ (App Router) |
| **Styling** | Tailwind CSS |
| **Language** | TypeScript |
| **Backend** | Next.js API Routes |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **AI** | Google Generative AI (Gemini 1.5 Flash) |
| **Charts** | Chart.js + React Chart.js 2 |
| **PDF Parsing** | pdf-parse |
| **Utilities** | clsx, tailwind-merge |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier available at supabase.com)
- Google AI API key (get from ai.google.dev)

### Installation Steps

#### 1. Clone/Setup Repository
```bash
# Navigate to project directory
cd exam

# Create environment file
cp .env.example .env.local
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Edit `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Google Gemini AI
GOOGLE_AI_API_KEY=your_google_ai_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

#### 4. Setup Supabase Database
1. Create a new Supabase project
2. Go to SQL Editor
3. Run the schema from `database/schema.sql`
4. Enable Row Level Security (RLS) for all tables

#### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Features Deep Dive

### 1. Smart Exam Survival Planner
**Path**: `/planner`

User inputs:
- Subject name
- Syllabus topics (comma-separated)
- Exam date
- Confidence level (Low/Medium/High)
- Available study hours
- Current energy level

AI generates:
- High-priority topics to focus on
- Safe-to-skip topics (for now)
- Daily crash-study schedule
- Revision schedule
- Expected score potential
- Motivational message

### 2. Previous Year Question Analyzer
**Path**: `/pyq-analyzer`

Features:
- Upload PDF/image of previous year papers
- OCR/text extraction
- AI analysis identifies:
  - Repeated question patterns
  - Important units/topics
  - Question type distributions
  - Likely upcoming questions

Outputs:
- Pattern analysis
- Topic importance ranking
- Exam prediction

### 3. Night Before Exam Mode
**Path**: `/night-mode`

Generates:
- Ultra-condensed revision notes
- Memory triggers and associations
- Mnemonics for hard concepts
- Probable viva questions
- 5-hour emergency study plan

Perfect for last-minute studying when time is critical.

### 4. AI Explain Simplifier
**Feature**: Text simplification on any page

Paste complex content → Choose format:
- Simple everyday language
- 2-mark exam answer format
- 5-mark exam answer format
- 10-mark exam answer format
- Mnemonics and memory tricks

### 5. Energy-Aware Planning
**Feature**: Dashboard energy check

Energy levels affect planning:
- **Dead 💀**: Minimal study plan, only essentials
- **Tired 😴**: Shorter study sessions with breaks
- **Okay 😐**: Standard study plan
- **Locked In 🔥**: Intensive study plan

### 6. User Dashboard
**Path**: `/dashboard`

Displays:
- Recent exams and their status
- Quick access to tools
- Energy level tracker
- Study progress overview
- Recent notes and mnemonics

---

## 🔌 API Routes

### POST `/api/planner`
Generate a personalized study plan

**Request**:
```json
{
  "subject": "Data Structures",
  "syllabus": ["Arrays", "Linked Lists", "Trees", "Graphs"],
  "exam_date": "2026-05-20",
  "confidence_level": "low",
  "available_hours": 24,
  "energy_level": "okay"
}
```

**Response**:
```json
{
  "high_priority_topics": ["Arrays", "Trees"],
  "safe_to_skip": ["Advanced Graphs"],
  "daily_plan": [
    { "day": "Day 1", "focus": "Arrays basics", "hours": 3 }
  ],
  "expected_score": 72,
  "motivation": "Message from AI",
  "key_tips": ["Tip 1", "Tip 2"]
}
```

### POST `/api/pyq`
Analyze previous year question papers

**Request**:
```
FormData with file: PDF/image of exam paper
```

**Response**:
```json
{
  "repeated_questions": ["Question type 1", "Question type 2"],
  "important_units": ["Unit A", "Unit B"],
  "patterns": ["Pattern description"],
  "likely_questions": ["Question prediction"]
}
```

### POST `/api/explain`
Simplify complex text

**Request**:
```json
{
  "text": "Complex concept...",
  "answerType": "simple|twomark|fivemark|tenmark|mnemonic"
}
```

**Response**:
```json
{
  "simplified": "Simplified explanation..."
}
```

---

## 📊 Database Schema

### Key Tables

**exams**
- Stores exam information
- Links to user profile
- Tracks confidence level and available time

**study_plans**
- Generated plans from AI
- Stores high-priority/safe-to-skip topics
- Daily and revision schedules
- Expected score predictions

**pyq_uploads**
- Previous year question analyses
- File storage references
- Extracted patterns and likely questions

**notes**
- User notes (revision, mnemonics, viva)
- Linked to exams
- Offline support flag

**night_mode_sessions**
- Night-before exam mode sessions
- Emergency study plans
- Revision notes and mnemonics

**energy_logs**
- Track energy levels over time
- Used for insights and planning

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Policies enforce user_id checking

---

## 🎯 Development Guidelines

### Component Structure
```typescript
// Example component
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function FeaturePage() {
  const [state, setState] = useState('');
  
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Content */}
      </div>
    </div>
  );
}
```

### API Route Structure
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Process request
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error message' },
      { status: 500 }
    );
  }
}
```

### Styling Conventions
- Use Tailwind utility classes
- Dark mode by default
- `text-white` for text on dark backgrounds
- `text-slate-300` for secondary text
- `text-emerald-400` for success/achievements
- `text-blue-400` for headers
- `bg-slate-800` for secondary backgrounds

---

## 📦 Build & Deployment

### Development
```bash
npm run dev
```
Starts development server at `http://localhost:3000` with hot reload.

### Production Build
```bash
npm run build
npm start
```

### Deployment Options

**Vercel (Recommended)**:
```bash
npm install -g vercel
vercel deploy
```

**Docker**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Environment Setup on Production**:
- Set all environment variables in deployment platform
- Ensure Supabase database is accessible
- Configure CORS if needed

---

## 🐛 Troubleshooting

### Common Issues

**Next.js not found**:
```bash
npm install
npm run dev
```

**Supabase connection error**:
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project is active
- Verify RLS policies are correctly configured

**Google AI API errors**:
- Verify `GOOGLE_AI_API_KEY` is valid
- Check API quota usage
- Ensure API is enabled in Google Cloud

**Build errors**:
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

---

## 🚀 Future Enhancements

### Phase 2 Features
- User authentication UI with social logins
- Detailed score analytics and progress tracking
- Smart reminders and notification system
- Collaborative study groups
- Study streak tracking (non-guilt-based)
- PDF annotation and highlighting
- Voice-to-text note taking
- Advanced topic dependency mapping

### Phase 3 Features
- Mobile app (React Native)
- Offline sync with Service Workers
- Advanced AI: custom model fine-tuning
- Integration with course platforms (Canvas, Blackboard)
- Anonymous mode for sensitive exams
- Export study plans to PDF/calendar

---

## 📝 Environment Variables Checklist

Before deploying or running:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Set
- [ ] `GOOGLE_AI_API_KEY` - Set
- [ ] `.env.local` created from `.env.example`
- [ ] Database schema imported to Supabase
- [ ] RLS policies enabled and tested
- [ ] CORS configured if needed

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Guide](https://supabase.com/docs)
- [Google Generative AI](https://ai.google.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated**: May 7, 2026

**Remember**: This tool is built for students who are struggling, not those who have it all together. You don't need to be perfect. You just need to pass. Let's make it happen. 💪