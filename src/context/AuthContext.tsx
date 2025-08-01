import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any email/password
    if (email && password.length >= 6) {
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0]
      };
      
      const token = 'dummy_jwt_token_' + Date.now();
      
      localStorage.setItem('tickr_token', token);
      localStorage.setItem('tickr_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any valid email/password
    if (email && password.length >= 6) {
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0]
      };
      
      const token = 'dummy_jwt_token_' + Date.now();
      
      localStorage.setItem('tickr_token', token);
      localStorage.setItem('tickr_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('tickr_token');
    localStorage.removeItem('tickr_user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
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