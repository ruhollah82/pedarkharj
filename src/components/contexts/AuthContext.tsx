import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextProps {
  currentUser: any;
  isAuthenticated: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  signup: (
    phoneNumber: string,
    password: string,
    username: string
  ) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const isAuthenticated = !!currentUser;

  const login = async (phoneNumber: string, password: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8888/users?phoneNumber=${phoneNumber}&password=${password}`
      );

      if (response.data.length === 0) {
        throw new Error("شماره تلفن یا رمز عبور اشتباه است.");
      }

      console.log("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (
    phoneNumber: string,
    password: string,
    username: string
  ) => {
    try {
      const response = await axios.post("http://localhost:8888/users", {
        phoneNumber,
        password,
        username,
      });
      const newUser = response.data;
      setCurrentUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
