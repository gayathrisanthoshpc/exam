export interface Exam {
  id: string;
  user_id: string;
  subject: string;
  syllabus: string[];
  exam_date: string;
  confidence_level: 'low' | 'medium' | 'high';
  available_hours: number;
  created_at: string;
}

export interface StudyPlan {
  id: string;
  exam_id: string;
  plan_data: {
    high_priority_topics: string[];
    safe_to_skip: string[];
    daily_plan: { day: string; topics: string[]; hours: number }[];
    revision_schedule: { date: string; topics: string[] }[];
    expected_score: number;
  };
  created_at: string;
}

export interface PYQUpload {
  id: string;
  user_id: string;
  file_url: string;
  analysis: {
    repeated_questions: string[];
    important_units: string[];
    patterns: string[];
    likely_questions: string[];
  };
  created_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  content: string;
  type: 'revision' | 'mnemonic' | 'viva';
  created_at: string;
}

export interface UserEnergy {
  level: 'dead' | 'tired' | 'okay' | 'locked_in';
  last_updated: string;
}