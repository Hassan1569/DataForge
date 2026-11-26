import { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext(undefined);

export function SettingsProvider({ children }) {
  // Load initial state from localStorage or defaults
  const [theme, setTheme] = useState(() => localStorage.getItem('df-theme') || 'light');
  const [defaultFormat, setDefaultFormat] = useState(() => localStorage.getItem('df-format') || 'csv');
  const [strictValidation, setStrictValidation] = useState(() => {
    return localStorage.getItem('df-strict-validation') === 'true';
  });

  // Apply theme to the HTML document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('df-theme', theme);
  }, [theme]);

  // Save other preferences
  useEffect(() => {
    localStorage.setItem('df-format', defaultFormat);
  }, [defaultFormat]);

  useEffect(() => {
    localStorage.setItem('df-strict-validation', strictValidation.toString());
  }, [strictValidation]);

  return (
    <SettingsContext.Provider value={{
      theme, setTheme,
      defaultFormat, setDefaultFormat,
      strictValidation, setStrictValidation
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
}