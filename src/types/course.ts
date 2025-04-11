export interface Course {
  id: number;
  title: string;
  description: string;
  language: string;
  difficulty: string;
  duration: string;
  rating: number;
  image: string;
  fullDescription: string;
  modules: Module[];
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'reading' | 'practice' | 'quiz';
  duration: string;
  content: string;
  completed: boolean;
  locked?: boolean;
  code?: CodeExercise;
}

export interface CodeExercise {
  task: string;
  initialCode: string;
  solution: string;
  tests: TestCase[];
}

export interface TestCase {
  input: any[];
  expected: any;
  description: string;
}

export interface UserProgress {
  courseId: number;
  lastAccessed: string;
  completedLessons: number[];
  currentLesson: number;
  timeSpent: number; // Time spent in minutes
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateEarned: string;
}