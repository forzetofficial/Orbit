import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaLock, FaPlay, FaBook, FaCode, FaQuestionCircle } from 'react-icons/fa';
import { marked } from 'marked';
import styles from './CourseContent.module.css';
import { COURSES } from '../../data/courses';
import { useCourses } from '../../context/CourseContext';
import CodeEditor from '../../components/CodeEditor/CodeEditor';

const CourseContent = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getProgress, updateProgress, getCourseCompletionPercentage } = useCourses();
  
  const course = COURSES.find(c => c.id === Number(courseId));
  const progress = courseId ? getProgress(Number(courseId)) : undefined;
  
  const [activeLesson, setActiveLesson] = useState(
    course?.modules[0].lessons.find(l => l.id === progress?.currentLesson) || 
    course?.modules[0].lessons[0] || 
    null
  );

  useEffect(() => {
    if (course && activeLesson) {
      updateProgress(course.id, activeLesson.id);
    }
  }, [activeLesson?.id]);
  
  if (!course || !progress) {
    return (
      <div className={styles.notFound}>
        <h2>Курс не найден</h2>
        <button className="btn btn-primary" onClick={() => navigate('/my-learning')}>
          Вернуться к моим курсам
        </button>
      </div>
    );
  }

  const handleLessonComplete = () => {
    if (course && activeLesson) {
      updateProgress(course.id, activeLesson.id);
    }
  };
  
  const handleLessonClick = (lessonId: number) => {
    const lesson = course.modules
      .flatMap(m => m.lessons)
      .find(l => l.id === lessonId);
    
    if (lesson && !lesson.locked) {
      setActiveLesson(lesson);
    }
  };
  
  const progressPercentage = getCourseCompletionPercentage(course.id);
  
  const getLessonContent = () => {
    if (!activeLesson) return null;

    switch (activeLesson.type) {
      case 'reading':
        return (
          <div 
            className={styles.readingContent}
            dangerouslySetInnerHTML={{ __html: marked(activeLesson.content) }}
          />
        );
      case 'practice':
        return activeLesson.code ? (
          <CodeEditor 
            exercise={activeLesson.code} 
            onComplete={handleLessonComplete}
          />
        ) : null;
      case 'video':
        return (
          <div className={styles.videoContent}>
            <video 
              controls 
              src={activeLesson.content}
              onEnded={handleLessonComplete}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.courseContent}>
      <button className={styles.backButton} onClick={() => navigate('/my-learning')}>
        <FaArrowLeft /> Назад к моим курсам
      </button>
      
      <div className={styles.courseHeader}>
        <h1>{course.title}</h1>
        <div className={styles.progressContainer}>
          <span>Прогресс: {progressPercentage}%</span>
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className={styles.courseLayout}>
        <aside className={styles.courseSidebar}>
          {course.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className={styles.moduleCard}>
              <h3 className={styles.moduleTitle}>{module.title}</h3>
              
              <ul className={styles.lessonsList}>
                {module.lessons.map((lesson) => {
                  const isCompleted = progress.completedLessons.includes(lesson.id);
                  const isActive = activeLesson?.id === lesson.id;
                  
                  return (
                    <li 
                      key={lesson.id} 
                      className={`
                        ${styles.lessonItem} 
                        ${isActive ? styles.active : ''}
                        ${isCompleted ? styles.completed : ''}
                        ${lesson.locked ? styles.locked : ''}
                      `}
                      onClick={() => handleLessonClick(lesson.id)}
                    >
                      <div className={styles.lessonInfo}>
                        <div className={styles.lessonIcon}>
                          {isCompleted ? (
                            <FaCheck />
                          ) : lesson.locked ? (
                            <FaLock />
                          ) : (
                            {
                              'video': <FaPlay />,
                              'reading': <FaBook />,
                              'practice': <FaCode />,
                              'quiz': <FaQuestionCircle />
                            }[lesson.type]
                          )}
                        </div>
                        <div className={styles.lessonDetails}>
                          <span className={styles.lessonTitle}>{lesson.title}</span>
                          <div className={styles.lessonMeta}>
                            <span className={styles.lessonType}>
                              {
                                {
                                  'video': 'Видео',
                                  'reading': 'Чтение',
                                  'practice': 'Практика',
                                  'quiz': 'Тест'
                                }[lesson.type]
                              }
                            </span>
                            <span className={styles.lessonDuration}>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>
        
        <main className={styles.lessonContent}>
          {activeLesson ? (
            <div className={styles.lessonContainer}>
              <div className={styles.lessonHeader}>
                <h2>{activeLesson.title}</h2>
                <div className={styles.lessonBadge}>
                  {
                    {
                      'video': 'Видео',
                      'reading': 'Чтение',
                      'practice': 'Практика',
                      'quiz': 'Тест'
                    }[activeLesson.type]
                  }
                </div>
              </div>
              
              <div className={styles.lessonBody}>
                {getLessonContent()}
              </div>
            </div>
          ) : (
            <div className={styles.noLessonSelected}>
              <p>Выберите урок из списка слева, чтобы начать обучение.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseContent;