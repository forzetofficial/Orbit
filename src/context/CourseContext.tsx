import React, { createContext, useContext, ReactNode } from 'react';
import { Course, UserProgress, Achievement } from '../types/course';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { COURSES } from '../data/courses';

interface CourseContextType {
  enrolledCourses: number[];
  progress: UserProgress[];
  achievements: Achievement[];
  enrollInCourse: (courseId: number) => void;
  updateProgress: (courseId: number, lessonId: number) => void;
  updateTimeSpent: (courseId: number, minutes: number) => void;
  getProgress: (courseId: number) => UserProgress | undefined;
  getCourseCompletionPercentage: (courseId: number) => number;
  checkAndUpdateAchievements: () => void;
  getTotalProgress: () => number;
  getTotalTimeSpent: () => number;
  getCoursesStats: () => { completed: number; inProgress: number; total: number };
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage<number[]>('enrolledCourses', []);
  const [progress, setProgress] = useLocalStorage<UserProgress[]>('courseProgress', []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('achievements', []);

  const enrollInCourse = (courseId: number) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      
      const course = COURSES.find(c => c.id === courseId);
      if (course) {
        const newProgress: UserProgress = {
          courseId,
          lastAccessed: new Date().toISOString(),
          completedLessons: [],
          currentLesson: course.modules[0].lessons[0].id,
          timeSpent: 0
        };
        setProgress([...progress, newProgress]);
        checkAndUpdateAchievements();
      }
    }
  };

  const updateProgress = (courseId: number, lessonId: number) => {
    setProgress(progress.map(p => {
      if (p.courseId === courseId) {
        const updatedCompletedLessons = [...new Set([...p.completedLessons, lessonId])];
        return {
          ...p,
          lastAccessed: new Date().toISOString(),
          completedLessons: updatedCompletedLessons,
          currentLesson: lessonId
        };
      }
      return p;
    }));
    checkAndUpdateAchievements();
  };

  const updateTimeSpent = (courseId: number, minutes: number) => {
    setProgress(progress.map(p => {
      if (p.courseId === courseId) {
        return {
          ...p,
          timeSpent: p.timeSpent + minutes
        };
      }
      return p;
    }));
  };

  const getProgress = (courseId: number) => {
    return progress.find(p => p.courseId === courseId);
  };

  const getCourseCompletionPercentage = (courseId: number): number => {
    const course = COURSES.find(c => c.id === courseId);
    const userProgress = getProgress(courseId);

    if (!course || !userProgress) return 0;

    const totalLessons = course.modules.reduce(
      (total, module) => total + module.lessons.length,
      0
    );

    return Math.round((userProgress.completedLessons.length / totalLessons) * 100);
  };

  const getTotalProgress = (): number => {
    if (enrolledCourses.length === 0) return 0;
    
    const totalPercentage = enrolledCourses.reduce((sum, courseId) => {
      return sum + getCourseCompletionPercentage(courseId);
    }, 0);

    return Math.round(totalPercentage / enrolledCourses.length);
  };

  const getTotalTimeSpent = (): number => {
    return progress.reduce((total, p) => total + p.timeSpent, 0);
  };

  const getCoursesStats = () => {
    const stats = {
      completed: 0,
      inProgress: 0,
      total: enrolledCourses.length
    };

    enrolledCourses.forEach(courseId => {
      const completion = getCourseCompletionPercentage(courseId);
      if (completion === 100) {
        stats.completed++;
      } else if (completion > 0) {
        stats.inProgress++;
      }
    });

    return stats;
  };

  const checkAndUpdateAchievements = () => {
    const newAchievements: Achievement[] = [];

    // First Course Enrollment
    if (enrolledCourses.length === 1 && !achievements.find(a => a.id === 'first_course')) {
      newAchievements.push({
        id: 'first_course',
        title: 'Первые шаги',
        description: 'Записались на первый курс',
        icon: '🚀',
        dateEarned: new Date().toISOString()
      });
    }

    // Course Completion
    enrolledCourses.forEach(courseId => {
      const completionPercentage = getCourseCompletionPercentage(courseId);
      const course = COURSES.find(c => c.id === courseId);
      
      if (completionPercentage === 100 && course) {
        const achievementId = `complete_${course.language.toLowerCase()}`;
        if (!achievements.find(a => a.id === achievementId)) {
          newAchievements.push({
            id: achievementId,
            title: `Мастер ${course.language}`,
            description: `Завершили курс по ${course.language}`,
            icon: '🏆',
            dateEarned: new Date().toISOString()
          });
        }
      }
    });

    // Progress Milestones
    const totalProgress = getTotalProgress();
    const progressMilestones = [
      { id: 'progress_25', title: 'На четверть пути', threshold: 25, icon: '🌱' },
      { id: 'progress_50', title: 'Половина пройдена', threshold: 50, icon: '🌿' },
      { id: 'progress_75', title: 'Почти у цели', threshold: 75, icon: '🌳' },
      { id: 'progress_100', title: 'Полный курс', threshold: 100, icon: '🎓' }
    ];

    progressMilestones.forEach(milestone => {
      if (totalProgress >= milestone.threshold && !achievements.find(a => a.id === milestone.id)) {
        newAchievements.push({
          id: milestone.id,
          title: milestone.title,
          description: `Достигли ${milestone.threshold}% общего прогресса`,
          icon: milestone.icon,
          dateEarned: new Date().toISOString()
        });
      }
    });

    // Time Spent Milestones
    const totalTimeSpent = getTotalTimeSpent();
    const timeSpentMilestones = [
      { id: 'time_1', title: 'Первый час', threshold: 60, icon: '⏱️' },
      { id: 'time_5', title: 'Усердный ученик', threshold: 300, icon: '⌚' },
      { id: 'time_10', title: 'Настойчивость', threshold: 600, icon: '🕰️' }
    ];

    timeSpentMilestones.forEach(milestone => {
      if (totalTimeSpent >= milestone.threshold && !achievements.find(a => a.id === milestone.id)) {
        newAchievements.push({
          id: milestone.id,
          title: milestone.title,
          description: `Провели ${milestone.threshold / 60} часов за обучением`,
          icon: milestone.icon,
          dateEarned: new Date().toISOString()
        });
      }
    });

    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
    }
  };

  return (
    <CourseContext.Provider value={{
      enrolledCourses,
      progress,
      achievements,
      enrollInCourse,
      updateProgress,
      updateTimeSpent,
      getProgress,
      getCourseCompletionPercentage,
      checkAndUpdateAchievements,
      getTotalProgress,
      getTotalTimeSpent,
      getCoursesStats
    }}>
      {children}
    </CourseContext.Provider>
  );
};