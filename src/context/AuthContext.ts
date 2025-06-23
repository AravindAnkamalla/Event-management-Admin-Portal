import React, { useState, useEffect, createContext, useContext } from "react";

import type { User } from "../types";
import { loginUser, resetPasswordEmail } from "../api/users";

// Define AuthContextType
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

// Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Simulate persistent login (e.g., checking localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // --- Authentication Functions ---
  const login = async (email: string, password: string): Promise<boolean> => {
    const response = await loginUser(email, password);
    if (!response) {
      return false; // Login failed
    }
    const { user } = response;
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("adminUser", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("adminUser");
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    return resetPasswordEmail(email);
  };

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        isAuthenticated: isAuthenticated,
        user: user,
        login: login,
        logout: logout,
        resetPassword: resetPassword,
      },
    },
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
