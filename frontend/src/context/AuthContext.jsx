import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('shine_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('shine_token', data.token);
    localStorage.setItem('shine_user', JSON.stringify({ name: data.name, email: data.email, role: data.role }));
    setUser({ name: data.name, email: data.email, role: data.role });
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('shine_token');
    localStorage.removeItem('shine_user');
    setUser(null);
  }, []);

  const register = useCallback(async (personData) => {
    const { data } = await api.post('/auth/register', personData);
    return data;
  }, []);

  const isAdmin = user?.role === 'ROLE_ADMIN';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
