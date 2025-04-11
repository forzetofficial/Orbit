import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Layout.module.css';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Layout = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  // In a real app, you would have a login page
  if (!isAuthenticated) {
    // For demo purposes, we're assuming the user is authenticated
    // return <Navigate to="/login" />;
  }

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
        <div className={styles.stars3}></div>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;