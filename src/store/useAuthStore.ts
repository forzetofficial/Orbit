import { create } from 'zustand';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string; name: string };
  error: boolean;
  setError: (error: boolean) => void;
  signIn: (email: string, password: string, navigate: NavigateFunction) => Promise<void>;
  signUp: (email: string, password: string, name: string, navigate: NavigateFunction) => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  error: false,
  setError: (error) => set({ error }),
  
  signIn: async (email, password, navigate) => {
    try {
      const response = await axios.post('https://cookhub.space/api/v1/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        set({ isAuthenticated: true, user: response.data.user, error: false });
        navigate('/home');
      }
    } catch (error) {
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },

  signUp: async (email, password, username, navigate) => {
    try {
      const response = await axios.post('https://cookhub.space/api/v1/auth/register', {
        email,
        password,
        username,
      });

      if (response.status === 200) {
        navigate('/auth');
      }
    } catch (error) {
      console.log(error);
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await axios.post('https://cookhub.space/api/v1/auth/forgot_password', {
        email,
      });

      return response.status === 200;
    } catch (error) {
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
      return false;
    }
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));