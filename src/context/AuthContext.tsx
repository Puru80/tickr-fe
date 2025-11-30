import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, registerUser } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('tickr_token');
    const userData = localStorage.getItem('tickr_user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('tickr_token');
        localStorage.removeItem('tickr_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginUser(email, password);
      if (response.ok) {
        const data = await response.json();
        // Ensure the response has the expected structure
        if (data.data.token && data.data.user) {
          const { token, user } = data;
          localStorage.setItem('tickr_token', token);
          localStorage.setItem('tickr_user', JSON.stringify(user));
          setUser(user);
          return true;
        } else {
          console.error('Login API response missing required fields:', data);
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await registerUser(name, email, password);
      if (response.ok) {
        const data = await response.json();
        // Ensure the response has the expected structure
        if (data.data.token && data.data.user) {
          const { token, user } = data;
          localStorage.setItem('tickr_token', token);
          localStorage.setItem('tickr_user', JSON.stringify(user));
          setUser(user);
          return true;
        } else {
          console.error('Register API response missing required fields:', data);
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('tickr_token');
    localStorage.removeItem('tickr_user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user || !!(localStorage.getItem('tickr_token') && localStorage.getItem('tickr_user')),
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};