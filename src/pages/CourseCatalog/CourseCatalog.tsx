import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaFilter, FaSearch, FaStar } from 'react-icons/fa';
import styles from './CourseCatalog.module.css';
import { COURSES } from '../../data/courses';
import React from 'react';

const CourseCatalog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filters, setFilters] = useState({
    language: '',
    difficulty: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(COURSES);

  // Filter courses based on search query and filters
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let result = COURSES;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply language filter
    if (filters.language) {
      result = result.filter(course => course.language === filters.language);
    }
    
    // Apply difficulty filter
    if (filters.difficulty) {
      result = result.filter(course => course.difficulty === filters.difficulty);
    }
    
    setFilteredCourses(result);
    // Update URL with search query
    navigate(`/catalog${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  const handleFilterChange = (filterType: 'language' | 'difficulty', value: string) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(newFilters);
    
    let result = COURSES;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply new filters
    if (newFilters.language) {
      result = result.filter(course => course.language === newFilters.language);
    }
    if (newFilters.difficulty) {
      result = result.filter(course => course.difficulty === newFilters.difficulty);
    }
    
    setFilteredCourses(result);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/catalog/${courseId}`);
  };

  // Get unique languages and difficulties for filter options
  const languages = Array.from(new Set(COURSES.map(course => course.language)));
  const difficulties = Array.from(new Set(COURSES.map(course => course.difficulty)));

  return (
    <div className={styles.catalogPage}>
      <div className={styles.catalogHeader}>
        <h1 className="page-title">Каталог курсов</h1>
        
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
        
        <button 
          className={`${styles.filterToggle} ${isFilterOpen ? styles.active : ''}`}
          onClick={toggleFilter}
        >
          <FaFilter />
          <span>Фильтры</span>
        </button>
      </div>
      
      <div className={styles.catalogContent}>
        <aside className={`${styles.filterSidebar} ${isFilterOpen ? styles.open : ''}`}>
          <div className={styles.filterSection}>
            <h3>Язык программирования</h3>
            <div className={styles.filterOptions}>
              <div 
                className={`${styles.filterOption} ${filters.language === '' ? styles.active : ''}`}
                onClick={() => handleFilterChange('language', '')}
              >
                Все
              </div>
              {languages.map(language => (
                <div 
                  key={language}
                  className={`${styles.filterOption} ${filters.language === language ? styles.active : ''}`}
                  onClick={() => handleFilterChange('language', language)}
                >
                  {language}
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.filterSection}>
            <h3>Уровень сложности</h3>
            <div className={styles.filterOptions}>
              <div 
                className={`${styles.filterOption} ${filters.difficulty === '' ? styles.active : ''}`}
                onClick={() => handleFilterChange('difficulty', '')}
              >
                Все
              </div>
              {difficulties.map(difficulty => (
                <div 
                  key={difficulty}
                  className={`${styles.filterOption} ${filters.difficulty === difficulty ? styles.active : ''}`}
                  onClick={() => handleFilterChange('difficulty', difficulty)}
                >
                  {difficulty}
                </div>
              ))}
            </div>
          </div>
        </aside>
        
        <div className={styles.coursesGrid}>
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
                  <div className={styles.courseFooter}>
                    <span className={styles.courseDifficulty}>{course.difficulty}</span>
                    <span className={styles.courseDuration}>{course.duration}</span>
                  </div>
                  <div className={styles.courseRating}>
                    <FaStar className={styles.starIcon} />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noCourses}>
              <p>Курсы не найдены. Попробуйте изменить параметры поиска.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;