import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { fetchCurrentUser, loginUser, registerUser, updateCurrentUser } from '../services/api';

interface DoctorProfile {
  specialty: string;
  avatar: string | null;
}

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile?: DoctorProfile;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  updateUser: (userData: any) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await fetchCurrentUser();
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: any) => {
    const data = await loginUser(credentials);
    if (data.access) {
      localStorage.setItem('token', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      const userData = await fetchCurrentUser();
      setUser(userData);
    }
  };

  const register = async (data: any) => {
    await registerUser(data);
    await login({ username: data.username, password: data.password });
  };

  const updateUser = async (userData: any) => {
    const updatedUser = await updateCurrentUser(userData);
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};