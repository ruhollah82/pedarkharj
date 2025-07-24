import React, { createContext, useContext, useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { lightTheme } from "./light-theme";
import { darkTheme } from "./dark-theme";
import faIR from "antd/locale/fa_IR"; // فارسی‌سازی AntD

const ThemeModeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
  };

  const themeConfig = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider theme={themeConfig} direction="rtl" locale={faIR}>
        {children}
      </ConfigProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);
