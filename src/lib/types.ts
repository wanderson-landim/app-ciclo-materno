export type AppMode = 'cycle' | 'pregnancy' | 'postpartum';

export interface CycleData {
  lastPeriodDate: Date;
  cycleLength: number;
  periodLength: number;
}

export interface Symptom {
  date: Date;
  mood: string[];
  cramps: number; // 0-5
  flow: 'light' | 'medium' | 'heavy' | 'none';
  breastPain: number; // 0-5
  discharge: string;
  libido: number; // 0-5
}

export interface PregnancyData {
  dueDate: Date;
  currentWeek: number;
  lastCheckup?: Date;
  weight?: number;
  bloodPressure?: string;
  glucose?: number;
}

export interface BabyData {
  birthDate: Date;
  name?: string;
  weight?: number;
  feedingSchedule?: FeedingEntry[];
  sleepSchedule?: SleepEntry[];
}

export interface FeedingEntry {
  date: Date;
  time: string;
  amount: number; // ml
  type: 'breast' | 'formula' | 'solid';
}

export interface SleepEntry {
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // minutes
}

export interface Reminder {
  id: string;
  type: 'water' | 'vitamin' | 'appointment' | 'movement' | 'custom';
  time: string;
  days: number[]; // 0-6 (domingo-sábado)
  message: string;
  enabled: boolean;
}

export interface Appointment {
  id: string;
  date: Date;
  type: 'checkup' | 'ultrasound' | 'vaccine' | 'exam' | 'other';
  title: string;
  notes?: string;
  completed: boolean;
}
