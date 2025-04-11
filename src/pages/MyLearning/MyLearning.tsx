import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaSearch } from 'react-icons/fa';
import styles from './MyLearning.module.css';
import React from 'react';
import { COURSES } from '../../data/courses';
import { useCourses } from '../../context/CourseContext';

const MyLearning = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { enrolledCourses, progress, getCourseCompletionPercentage } = useCourses();
  
  // Get enrolled courses data
  const userCourses = COURSES.filter(course => enrolledCourses.includes(course.id));
  
  // Filter courses based on search query
  const filteredCourses = userCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleCourseClick = (courseId: number) => {
    navigate(`/my-learning/${courseId}`);
  };
  
  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get last accessed date for a course
  const getLastAccessed = (courseId: number) => {
    const courseProgress = progress.find(p => p.courseId === courseId);
    return courseProgress?.lastAccessed || new Date().toISOString();
  };
  
  return (
    <div className={styles.myLearningPage}>
      <h1 className="page-title">Моё обучение</h1>
      
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="Поиск в моих курсах..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <FaSearch />
          </button>
        </div>
      </form>
      
      <div className={styles.coursesList}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div 
              key={course.id} 
              className={styles.courseCard}
              onClick={() => handleCourseClick(course.id)}
            >
              <div className={styles.courseImage}>
                <img src={course.image} alt={course.title} />
                <div className={styles.courseLanguage}>{course.language}</div>
              </div>
              
              <div className={styles.courseContent}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                
                <div className={styles.progressSection}>
                  <div className={styles.progressInfo}>
                    <span>Прогресс: {getCourseCompletionPercentage(course.id)}%</span>
                    <span className={styles.lastAccessed}>
                      Последний доступ: {formatDate(getLastAccessed(course.id))}
                    </span>
                  </div>
                  
                  <div className={styles.progressBarContainer}>
                    <div 
                      className={styles.progressBar} 
                      style={{ width: `${getCourseCompletionPercentage(course.id)}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className={`btn btn-primary ${styles.continueButton}`}>
                  <FaRocket /> Продолжить обучение
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noCourses}>
            <p>У вас пока нет курсов. Перейдите в каталог, чтобы начать обучение.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/catalog')}
            >
              Перейти в каталог
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;