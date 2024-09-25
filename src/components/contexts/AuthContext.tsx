import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load authentication state from localStorage on initial load
  useEffect(() => {
    const savedAuthState = localStorage.getItem("isAuthenticated");
    if (savedAuthState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (phoneNumber: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (phoneNumber === "09123456789" && password === "password") {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          resolve();
        } else {
          reject(new Error("نام کاربری یا رمز عبور نامعتبر"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
