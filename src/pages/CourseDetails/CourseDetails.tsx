import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaClock, FaChartBar, FaRocket, FaArrowLeft } from 'react-icons/fa';
import styles from './CourseDetails.module.css';
import React from 'react';
import { COURSES } from '../../data/courses';
import { useCourses } from '../../context/CourseContext';

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { enrollInCourse } = useCourses();
  
  // Find the course by ID
  const course = COURSES.find(c => c.id === Number(courseId));
  
  if (!course) {
    return (
      <div className={styles.notFound}>
        <h2>Курс не найден</h2>
        <button className="btn btn-primary" onClick={() => navigate('/catalog')}>
          Вернуться к каталогу
        </button>
      </div>
    );
  }
  
  const handleStartCourse = () => {
    enrollInCourse(course.id);
    navigate(`/my-learning/${courseId}`);
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <div className={styles.courseDetails}>
      <button className={styles.backButton} onClick={handleBackClick}>
        <FaArrowLeft /> Назад
      </button>
      
      <div className={styles.courseHeader}>
        <div className={styles.courseImage}>
          <img src={course.image} alt={course.title} />
          <div className={styles.courseLanguage}>{course.language}</div>
        </div>
        
        <div className={styles.courseInfo}>
          <h1>{course.title}</h1>
          
          <div className={styles.courseStats}>
            <div className={styles.courseStat}>
              <FaStar className={styles.courseStatIcon} style={{ color: 'var(--warning-color)' }} />
              <span>{course.rating.toFixed(1)}</span>
            </div>
            
            <div className={styles.courseStat}>
              <FaClock className={styles.courseStatIcon} />
              <span>{course.duration}</span>
            </div>
            
            <div className={styles.courseStat}>
              <FaChartBar className={styles.courseStatIcon} />
              <span>{course.difficulty}</span>
            </div>
          </div>
          
          <p className={styles.courseDescription}>{course.description}</p>
          
          <button className={`btn btn-primary ${styles.startButton}`} onClick={handleStartCourse}>
            <FaRocket /> Начать обучение
          </button>
        </div>
      </div>
      
      <div className={styles.courseContent}>
        <div className={styles.courseAbout}>
          <h2>О курсе</h2>
          <p>{course.fullDescription}</p>
        </div>
        
        <div className={styles.courseModules}>
          <h2>Программа курса</h2>
          
          <div className={styles.modulesList}>
            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className={styles.moduleCard}>
                <h3>{module.title}</h3>
                <ul className={styles.lessonsList}>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lesson.id}>
                      <span className={styles.lessonNumber}>{lessonIndex + 1}</span>
                      {lesson.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;