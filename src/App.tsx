import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CourseCatalog from './pages/CourseCatalog/CourseCatalog';
import MyLearning from './pages/MyLearning/MyLearning';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import CourseContent from './pages/CourseContent/CourseContent';
import Profile from './pages/Profile/Profile';
import { AuthPage } from './pages/Auth/AuthPage';
import { RegistrationPage } from './pages/Registration/RegistrationPage';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { useAuthStore } from './store/useAuthStore';
import {Homestart} from './pages/Homestart/Homestart';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <AuthProvider>
      <CourseProvider>
        <Routes>
          <Route path="/home" element={<Homestart />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/" element={true ? <Layout /> : <Navigate to="/auth" />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CourseCatalog />} />
            <Route path="catalog/:courseId" element={<CourseDetails />} />
            <Route path="my-learning" element={<MyLearning />} />
            <Route path="my-learning/:courseId" element={<CourseContent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;