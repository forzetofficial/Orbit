import { useState } from 'react';
import { FaSearch, FaRocket, FaChartLine, FaBook, FaClock } from 'react-icons/fa';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../context/CourseContext';
import React from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { getTotalProgress, getTotalTimeSpent, getCoursesStats } = useCourses();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const statistics = {
    totalProgress: getTotalProgress(),
    totalTimeSpent: getTotalTimeSpent(),
    courses: getCoursesStats()
  };

  const formatTimeSpent = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ч ${mins} мин`;
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Добро пожаловать в Орбиту успеха</h1>
        <p className={styles.heroSubtitle}>Ваш путь к звездам в мире программирования</p>
        
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="Поиск курсов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      <div className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>
          <FaChartLine className={styles.sectionIcon} />
          Ваша статистика обучения
        </h2>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaRocket />
            </div>
            <div className={styles.statInfo}>
              <h3>Общий прогресс</h3>
              <div className={styles.progressBarContainer}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${statistics.totalProgress}%` }}
                ></div>
              </div>
              <p>{statistics.totalProgress}% завершено</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaBook />
            </div>
            <div className={styles.statInfo}>
              <h3>Курсы</h3>
              <div className={styles.statNumbers}>
                <div className={styles.statNumber}>
                  <span>{statistics.courses.completed}</span>
                  <p>Завершено</p>
                </div>
                <div className={styles.statNumber}>
                  <span>{statistics.courses.inProgress}</span>
                  <p>В процессе</p>
                </div>
                <div className={styles.statNumber}>
                  <span>{statistics.courses.total}</span>
                  <p>Всего</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className={styles.recommendedSection}>
        <h2 className={styles.sectionTitle}>Рекомендуемые курсы</h2>
        <div className={styles.courseGrid}>
          {[1, 2, 3].map((id) => (
            <div key={id} className={styles.courseCard} onClick={() => navigate(`/catalog/${id}`)}>
              <div className={styles.courseImage} style={{ backgroundColor: `hsl(${id * 60}, 70%, 60%)` }}>
                <div className={styles.courseLanguage}>JavaScript</div>
              </div>
              <div className={styles.courseContent}>
                <h3>Основы JavaScript {id}</h3>
                <p>Изучите основы JavaScript и станьте frontend разработчиком</p>
                <div className={styles.courseFooter}>
                  <span className={styles.courseDifficulty}>Начальный</span>
                  <span className={styles.courseDuration}>10 часов</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;