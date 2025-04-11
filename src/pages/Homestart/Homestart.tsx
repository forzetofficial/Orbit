import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Homestart.module.css";
import React from 'react';

export function Homestart() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/auth");
  };

  // Generate stars for background animation
  const stars = Array(50).fill(null);

  return (
    <div className={styles.container}>
      {/* Animated stars background */}
      <div className={styles.starsContainer}>
        {stars.map((_, index) => (
          <div key={index} className={styles.star}></div>
        ))}
      </div>

      {/* Navigation header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Button
            onClick={() => navigate("/directions")}
            color="inherit"
            className={styles.navButton}
          >
            Направления
          </Button>
          <span className={styles.separator}>|</span>
          <Button
            onClick={() => navigate("/education")}
            color="inherit"
            className={styles.navButton}
          >
            Обучение
          </Button>
          <span className={styles.separator}>|</span>
          <Button
            onClick={() => navigate("/preparation")}
            color="inherit"
            className={styles.navButton}
          >
            Подготовка к Огэ\Егэ
          </Button>
        </nav>
      </header>

      {/* Main content */}
      <main className={styles.mainContent}>
        {/* Left section with text */}
        <section className={styles.textSection}>
          <h1 className={styles.title}>
            <span className={styles.orbitaText}>Орбита</span>
            <span className={styles.uspekhaText}>успеха</span>
          </h1>

          <p className={styles.subtitle}>стань капитаном своей судьбы</p>
          <p className={styles.subtitle}>и создай свою историю</p>

          <div className={styles.descriptionContainer}>
            <div className={styles.verticalLine}></div>
            <p className={styles.description}>
              Платформа предлагает все необходимое для развития молодого
              онлайн-образовательного предприятия. Все инструменты для
              маркетинга, продаж объединены в одном месте.
            </p>
          </div>

          <button className={styles.ctaButton} onClick={handleButtonClick}>
            Попробовать
          </button>
        </section>

        {/* Right section with images */}
        <section className={styles.imageSection}>
          <div className={styles.imageGrid}>
            <img
              src="https://cdn.monetnik.ru/storage/market-lot/91/27/91/11444_big.jpg"
              alt="Orbita Success"
              className={styles.gridImage}
            />
            <img
              src="https://cdn.culture.ru/images/80f73545-f5ef-5f7a-a98e-a86ddd8918e3"
              alt="Orbita Success"
              className={styles.gridImage}
            />
            <img
              src="https://cdn.culture.ru/images/9e05305f-3301-58e5-91ec-8b4e899299f7"
              alt="Orbita Success"
              className={styles.gridImage}
            />
            <img
              src="https://cdn.culture.ru/images/1b4f9ad5-748c-5417-bfc6-2271562cacf4"
              alt="Orbita Success"
              className={styles.gridImage}
            />
          </div>
          <blockquote className={styles.quote}>
            "Успех — это не конечная точка, а только начало путешествия."
          </blockquote>
        </section>
      </main>
    </div>
  );
}
