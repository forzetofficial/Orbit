import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaMedal, FaCalendarAlt, FaClock, FaCamera } from 'react-icons/fa';
import styles from './Profile.module.css';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import React from 'react';

const Profile = () => {
  const { user, updateAvatar } = useAuth();
  const { achievements, getTotalProgress } = useCourses();
  const [activeTab, setActiveTab] = useState('profile');
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [newAvatarSeed, setNewAvatarSeed] = useState('');

  const handleAvatarChange = () => {
    if (newAvatarSeed.trim()) {
      const newAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newAvatarSeed)}`;
      updateAvatar(newAvatarUrl);
      setShowAvatarInput(false);
      setNewAvatarSeed('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatarContainer}>
          <div className={styles.profileAvatar}>
            <img src={user?.avatar} alt="User avatar" />
          </div>
          <button 
            className={styles.changeAvatarButton}
            onClick={() => setShowAvatarInput(!showAvatarInput)}
          >
            <FaCamera />
          </button>
          {showAvatarInput && (
            <div className={styles.avatarInputContainer}>
              <input
                type="text"
                placeholder="Введите текст для генерации аватара"
                value={newAvatarSeed}
                onChange={(e) => setNewAvatarSeed(e.target.value)}
                className={styles.avatarInput}
              />
              <button 
                className="btn btn-primary"
                onClick={handleAvatarChange}
              >
                Сохранить
              </button>
            </div>
          )}
        </div>
        <div className={styles.profileInfo}>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
      </div>
      
      <div className={styles.profileTabs}>
        <button 
          className={`${styles.profileTab} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUser /> Профиль
        </button>
        <button 
          className={`${styles.profileTab} ${activeTab === 'achievements' ? styles.active : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <FaMedal /> Достижения
        </button>
      </div>
      
      <div className={styles.profileContent}>
        {activeTab === 'profile' && (
          <div className={styles.profileDetails}>
            <div className={styles.profileSection}>
              <h2>Личная информация</h2>
              
              <div className={styles.formGroup}>
                <label>Имя</label>
                <div className={styles.inputWithIcon}>
                  <FaUser className={styles.inputIcon} />
                  <input type="text" value={user?.name} readOnly />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Email</label>
                <div className={styles.inputWithIcon}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input type="email" value={user?.email} readOnly />
                </div>
              </div>
            </div>
            
            <div className={styles.profileSection}>
              <h2>Безопасность</h2>
              
              <div className={styles.formGroup}>
                <label>Пароль</label>
                <div className={styles.inputWithIcon}>
                  <FaLock className={styles.inputIcon} />
                  <input type="password" value="********" readOnly />
                </div>
                <button className={`btn btn-outline ${styles.changePasswordBtn}`}>
                  Изменить пароль
                </button>
              </div>
            </div>
            
            <div className={styles.profileSection}>
              <h2>Статистика обучения</h2>
              
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <FaCalendarAlt />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{getTotalProgress()}%</span>
                    <span className={styles.statLabel}>Общий прогресс</span>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <FaMedal />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{achievements.length}</span>
                    <span className={styles.statLabel}>Достижения</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div className={styles.achievementsSection}>
            <h2>Ваши достижения</h2>
            
            <div className={styles.achievementsGrid}>
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`${styles.achievementCard} ${styles.completed}`}
                >
                  <div className={styles.achievementIcon}>{achievement.icon}</div>
                  <div className={styles.achievementInfo}>
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    <div className={styles.achievementCompleted}>
                      <FaMedal className={styles.completedIcon} />
                      <span>Получено {formatDate(achievement.dateEarned)}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {achievements.length === 0 && (
                <div className={styles.noAchievements}>
                  <p>У вас пока нет достижений. Продолжайте обучение, чтобы получить их!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;