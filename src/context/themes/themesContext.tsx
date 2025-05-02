import React, { createContext, useContext, useState, useMemo } from 'react';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  hasImage: boolean;
  collapsed: boolean;
  toggled: boolean;
  toggleTheme: () => void;
  toggleImage: () => void;
  toggleCollapse: () => void;
  toggleSidebarMobile: () => void;
  setToggled: (value: boolean) => void;
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
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false); // Nuevo estado para móviles

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

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleSidebarMobile = () => setToggled(prev => !prev);

  const contextValue = useMemo(() => ({
    theme,
    hasImage,
    collapsed,
    toggled,
    toggleTheme,
    toggleImage,
    toggleCollapse,
    toggleSidebarMobile,
    setToggled,
  }), [theme, hasImage, collapsed, toggled]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
