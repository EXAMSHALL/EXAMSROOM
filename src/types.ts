// Language types
export type Language = 'en' | 'bn';

// Quiz types
export interface Question {
  id: string;
  textEn: string;
  textBn: string;
  optionsEn: string[];
  optionsBn: string[];
  correctAnswer: number; // index of correct option
  explanationEn: string;
  explanationBn: string;
}

export interface Quiz {
  id: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  class: string; // Class 6-10
  subject: string; // General Science, Mathematics, English, ICT, History & Culture
  questions: Question[];
  durationMinutes: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface StudentAttempt {
  id: string;
  studentId: string;
  quizId: string;
  answers: (number | null)[]; // index of selected option, null if not answered
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt: string;
  status: 'completed' | 'abandoned';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'guest';
  class?: string;
  createdAt: string;
}

export interface RetakeRequest {
  id: string;
  studentId: string;
  quizId: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}