// themesContext.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  hasImage: boolean;
  collapsed: boolean;
  toggleTheme: () => void;
  toggleImage: () => void;
  toggleCollapse: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('appTheme') === 'dark' ? 'dark' : 'light'
  );
  const [hasImage, setHasImage] = useState(localStorage.getItem('appHasImage') === 'true');
  const [collapsed, setCollapsed] = useState(false); // Nuevo estado de colapso

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
  };

  const toggleImage = () => {
    const newHasImage = !hasImage;
    setHasImage(newHasImage);
    localStorage.setItem('appHasImage', JSON.stringify(newHasImage));
  };

  const toggleCollapse = () => setCollapsed(!collapsed); // Función para alternar colapso

  const contextValue = useMemo(() => ({
    theme,
    hasImage,
    collapsed,
    toggleTheme,
    toggleImage,
    toggleCollapse,
  }), [theme, hasImage, collapsed]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
