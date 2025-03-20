"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const token = Cookies.get('dreamteam-auth');
    setIsAuthenticated(!!token);
  }, []);

  const login = () => {
    // Set a cookie that expires in 7 days
    Cookies.set('dreamteam-auth', 'true', { expires: 7 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('dreamteam-auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 