import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig, getCurrentTheme, applyTheme } from '../utils/themeConfig';

interface ThemeContextType {
  theme: ThemeConfig;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => getCurrentTheme());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize theme on mount
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
    applyTheme(currentTheme);
    setIsLoading(false);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};