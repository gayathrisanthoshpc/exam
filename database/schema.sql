-- Academic Damage Control Database Schema
-- Supabase PostgreSQL Database

-- Users table (auto-managed by Supabase Auth, but custom fields)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  energy_level TEXT DEFAULT 'okay',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Exams table
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  syllabus TEXT[] NOT NULL,
  exam_date DATE NOT NULL,
  confidence_level TEXT CHECK (confidence_level IN ('low', 'medium', 'high')),
  available_hours INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Study Plans table
CREATE TABLE IF NOT EXISTS public.study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  high_priority_topics TEXT[] NOT NULL,
  safe_to_skip TEXT[] NOT NULL,
  daily_plan JSONB NOT NULL,
  revision_schedule JSONB NOT NULL,
  expected_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PYQ Uploads table
CREATE TABLE IF NOT EXISTS public.pyq_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  repeated_questions TEXT[] DEFAULT '{}',
  important_units TEXT[] DEFAULT '{}',
  patterns TEXT[] DEFAULT '{}',
  likely_questions TEXT[] DEFAULT '{}',
  analysis_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notes table
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  note_type TEXT CHECK (note_type IN ('revision', 'mnemonic', 'viva', 'general')) DEFAULT 'general',
  is_offline BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Night Mode Sessions table
CREATE TABLE IF NOT EXISTS public.night_mode_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  revision_notes TEXT,
  memory_triggers TEXT[],
  mnemonics TEXT[],
  viva_questions TEXT[],
  survival_plan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Energy Logs table
CREATE TABLE IF NOT EXISTS public.energy_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  energy_level TEXT CHECK (energy_level IN ('dead', 'tired', 'okay', 'locked_in')),
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_exams_user_id ON public.exams(user_id);
CREATE INDEX idx_exams_exam_date ON public.exams(exam_date);
CREATE INDEX idx_study_plans_exam_id ON public.study_plans(exam_id);
CREATE INDEX idx_study_plans_user_id ON public.study_plans(user_id);
CREATE INDEX idx_pyq_uploads_user_id ON public.pyq_uploads(user_id);
CREATE INDEX idx_notes_user_id ON public.notes(user_id);
CREATE INDEX idx_notes_exam_id ON public.notes(exam_id);
CREATE INDEX idx_night_mode_sessions_user_id ON public.night_mode_sessions(user_id);
CREATE INDEX idx_energy_logs_user_id ON public.energy_logs(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pyq_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.night_mode_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.energy_logs ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view own profile" 
  ON public.user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Policies for exams
CREATE POLICY "Users can view own exams" 
  ON public.exams FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create exams" 
  ON public.exams FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exams" 
  ON public.exams FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policies for study_plans
CREATE POLICY "Users can view own study plans" 
  ON public.study_plans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create study plans" 
  ON public.study_plans FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Similar policies for other tables...
-- (Following the same pattern of user_id checking)