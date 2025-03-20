"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Always clear auth on initial load so users start logged out
  useEffect(() => {
    const init = async () => {
      try {
        // Clear any existing auth token to ensure users start logged out
        Cookies.remove("dreamteam-auth");
        setUser(null);
      } catch (error) {
        console.error("Authentication initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (email: string, _password: string) => {
    setLoading(true);
    try {
      // In a real app, you would validate credentials with your API
      // For demo purposes, we'll just mock a successful login
      
      // Set a cookie to persist the session
      Cookies.set("dreamteam-auth", "demo-token", { expires: 7 });
      
      setUser({
        id: "user-1",
        name: "Demo User",
        email: email,
      });
      
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, _password: string) => {
    setLoading(true);
    try {
      // In a real app, you would register the user with your API
      // For demo purposes, we'll just mock a successful signup
      
      // Set a cookie to persist the session
      Cookies.set("dreamteam-auth", "demo-token", { expires: 7 });
      
      setUser({
        id: "user-1",
        name: name,
        email: email,
      });
      
      router.push("/");
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Remove the auth cookie
    Cookies.remove("dreamteam-auth");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
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