import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateAvatar: (newAvatar: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // In a real app, you would check for an existing session
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan'
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    // This would be an API call in a real application
    setUser({
      id: '1',
      name: 'Иван Иванов',
      email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateAvatar = (newAvatar: string) => {
    if (user) {
      setUser({ ...user, avatar: newAvatar });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};