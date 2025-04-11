import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import styles from './Header.module.css';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Главная страница';
      case '/catalog':
        return 'Каталог курсов';
      case '/my-learning':
        return 'Моё обучение';
      case '/profile':
        return 'Профиль';
      default:
        if (location.pathname.startsWith('/catalog/')) {
          return 'Описание курса';
        }
        if (location.pathname.startsWith('/my-learning/')) {
          return 'Прохождение курса';
        }
        return 'Орбита успеха';
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/home');
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <NavLink to="/">
              <span className={styles.logoText}>Орбита успеха</span>
            </NavLink>
          </div>
          
          <nav className={styles.navigation}>
            <div className={styles.pageTitle}>{getPageTitle()}</div>
            <ul className={styles.navLinks}>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/catalog" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Каталог курсов
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/my-learning" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Моё обучение
                </NavLink>
              </li>
            </ul>
          </nav>
          
          <div className={styles.userMenu}>
            <div className={styles.userAvatar} onClick={toggleDropdown}>
              <img src={user?.avatar} alt="User avatar" />
              <FaChevronDown className={styles.dropdownIcon} />
            </div>
            
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <ul>
                  <li onClick={handleProfileClick}>
                    <FaUser /> Профиль
                  </li>
                  <li onClick={handleLogout}>
                    <FaSignOutAlt /> Выход
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;