import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Initialize users data if it doesn't exist
    if (!localStorage.getItem('users')) {
      const adminUser: User = {
        id: 'admin-1',
        email: 'admin@autoecole-dijon.fr',
        password: 'admin123', // In a real app, this would be hashed
        firstName: 'Admin',
        lastName: 'User',
        role: UserRole.ADMIN,
        phone: '0123456789',
        createdAt: new Date().toISOString(),
      };
      
      const instructorUser: User = {
        id: 'instructor-1',
        email: 'instructor@autoecole-dijon.fr',
        password: 'instructor123', // In a real app, this would be hashed
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.INSTRUCTOR,
        phone: '0123456789',
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('users', JSON.stringify([adminUser, instructorUser]));
    }
    
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    // In a real app, this would make an API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user with this email already exists
    if (users.some((u: User) => u.email === userData.email)) {
      return false;
    }
    
    const newUser: User = {
      ...userData,
      id: `client-${Date.now()}`,
      role: UserRole.CLIENT, // New users are always clients
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after registration
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === user.id ? { ...u, ...data } : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isInitialized,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};