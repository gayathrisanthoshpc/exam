# Academic Damage Control 🚀

An AI-powered exam survival assistant for overwhelmed college students. This is **not** a productivity app—it's a realistic, low-pressure tool for students who need help surviving exams when time is running out, preparation is incomplete, or burnout is real.

## Philosophy

- **No Productivity Guilt**: This tool acknowledges that you might be behind, tired, or overwhelmed
- **Realistic Planning**: AI adjusts study plans based on your actual energy level
- **Survival Focus**: The goal is to help you pass, not to make you feel worse
- **Mobile-First**: Built for studying on phones and tablets

## Core Features

### 1. **Smart Exam Survival Planner**
- Enter exam details, syllabus, available time, and confidence level
- AI generates:
  - High-priority topics (focus here)
  - Safe-to-skip topics (for now)
  - Daily crash-study plans
  - Revision schedule
  - Expected score potential

### 2. **Previous Year Question Analyzer**
- Upload PDFs or images of previous year exam papers
- AI detects:
  - Repeated questions
  - Important units/topics
  - Common question patterns
  - Likely questions for upcoming exams

### 3. **Night Before Exam Mode**
- Last-minute survival toolkit
- Generates:
  - Ultra-short revision notes
  - Memory triggers and mnemonics
  - Probable viva questions
  - 5-hour emergency study plan

### 4. **AI Explain Simplifier**
- Paste difficult concepts or lengthy texts
- Convert into:
  - Simple, everyday language
  - 2-mark, 5-mark, or 10-mark answer formats
  - Mnemonics and memory triggers
  - Exam-ready explanations

### 5. **Burnout-Aware Planning**
- Check your energy level: Dead 💀 | Tired 😴 | Okay 😐 | Locked In 🔥
- AI adjusts study plans realistically based on energy
- No judgment, just realistic help

### 6. **Offline-Friendly Notes**
- Create and save notes locally
- Revision notes, mnemonics, viva questions
- Offline access for study sessions

## Tech Stack

- **Frontend**: Next.js 16+ with App Router
- **Styling**: Tailwind CSS with dark mode default
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API (1.5-Flash model)
- **Charts**: Chart.js for score analytics
- **PDF Parsing**: pdf-parse library
- **Authentication**: Supabase Auth

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx               # Root layout
│   │   ├── dashboard/               # Dashboard page
│   │   ├── planner/                 # Study planner
│   │   ├── pyq-analyzer/            # PYQ analyzer
│   │   ├── night-mode/              # Night mode tools
│   │   ├── settings/                # User settings
│   │   └── api/                     # API routes
│   │       ├── planner/             # Generate study plans
│   │       ├── pyq/                 # Analyze PYQs
│   │       ├── explain/             # Simplify concepts
│   │       └── ...
│   ├── components/
│   │   ├── ui/                      # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ...
│   │   ├── forms/                   # Form components
│   │   ├── charts/                  # Chart components
│   │   └── Navigation.tsx
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client
│   │   ├── ai.ts                    # AI utilities
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   └── hooks/
│       └── ...
├── database/
│   └── schema.sql                   # PostgreSQL schema
├── .env.example                     # Environment variables template
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier available)
- Google AI API key

### Installation

1. **Clone or create the project**
   ```bash
   # If starting fresh, copy .env.example to .env.local
   cp .env.example .env.local
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Edit `.env.local` with your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. **Set up Supabase Database**
   - Create a new Supabase project
   - Run the SQL schema from `database/schema.sql` in the SQL editor
   - Enable Row Level Security (RLS) policies

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Required environment variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (safe to expose) |
| `GOOGLE_AI_API_KEY` | Google Generative AI API key |
| `NEXT_PUBLIC_APP_URL` | Application URL (default: localhost:3000) |

## API Routes

### POST `/api/planner`
Generate a study plan based on exam details
```json
{
  "subject": "Data Structures",
  "syllabus": ["Arrays", "Linked Lists", "Trees"],
  "exam_date": "2026-05-20",
  "confidence_level": "low",
  "available_hours": 24,
  "energy_level": "okay"
}
```

### POST `/api/pyq`
Analyze previous year question papers
```
FormData with file: PDF or image of exam paper
```

### POST `/api/explain`
Simplify complex concepts
```json
{
  "text": "Complex explanation...",
  "answerType": "simple|twomark|fivemark|tenmark|mnemonic"
}
```

## Database Schema

Key tables:
- **exams**: Exam details and metadata
- **study_plans**: Generated study plans
- **pyq_uploads**: Previous year question analysis
- **notes**: User notes (revision, mnemonics, viva)
- **night_mode_sessions**: Night-before study kits
- **energy_logs**: User energy level history

See `database/schema.sql` for complete schema with RLS policies.

## UI Components

Core reusable components in `src/components/ui/`:
- `Button`: Primary, secondary, outline variants
- `Input`: Text input with validation
- `Textarea`: Multi-line text input
- `Card`: Content container
- `Navigation`: Main app navigation

Styling uses Tailwind CSS with custom color scheme:
- Primary: Blue-500 (`#3b82f6`)
- Secondary: Emerald-500 (`#10b981`)
- Accent: Indigo-500 (`#6366f1`)
- Background: Slate-900 (dark mode default)

## Performance Optimizations

- Server-side rendering for fast initial page load
- Image optimization with Next.js Image component
- API route compression and caching
- Database query optimization with indexes
- Client-side form validation before API calls

## Security

- Row Level Security (RLS) enabled in Supabase
- Environment variables not exposed in client bundle
- CORS configured for API routes
- Input validation on all API endpoints
- Authentication via Supabase Auth

## Development

### Build for production
```bash
npm run build
npm start
```

### Lint code
```bash
npm run lint
```

### Format code
```bash
npm run format  # if configured
```

## Deployment

### Deploy to Vercel (Recommended)
```bash
vercel deploy
```

### Environment variables on Vercel
Add these in Vercel dashboard under Project Settings > Environment Variables

### Database migration
Ensure `database/schema.sql` is run on production Supabase instance

## Contributing

This is an MVP project. Feel free to extend with:
- User authentication UI
- More comprehensive analytics
- Offline sync with Service Workers
- Push notifications
- Anonymous mode for sensitive exams
- Mobile app version

## License

MIT License - feel free to use, modify, and distribute

## Support

For issues or questions:
- Check existing issues in the repository
- Consult the [Next.js documentation](https://nextjs.org/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- Check [Google AI documentation](https://ai.google.dev/docs)

---

**Remember**: You don't need to be perfect. You just need to pass. This tool is here to help you survive exams when the pressure is on. Be kind to yourself, and let's make this work.
