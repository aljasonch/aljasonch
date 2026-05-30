import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Available solid accent themes (NO gradients — single solid colors only).
// `on` is the readable text/icon color to place ON the accent fill, chosen
// per-accent for contrast: dark text on bright accents, white on deeper ones.
export const ACCENTS = [
  { id: 'emerald', name: 'Emerald', hex: '#10b981', rgb: '16, 185, 129', on: '#09090b' },
  { id: 'blue', name: 'Ocean', hex: '#3b82f6', rgb: '59, 130, 246', on: '#ffffff' },
  { id: 'amber', name: 'Amber', hex: '#f59e0b', rgb: '245, 158, 11', on: '#09090b' },
  { id: 'rose', name: 'Rose', hex: '#f43f5e', rgb: '244, 63, 94', on: '#ffffff' },
  { id: 'violet', name: 'Violet', hex: '#8b5cf6', rgb: '139, 92, 246', on: '#ffffff' },
];

const ThemeContext = createContext(null);

const ACCENT_KEY = 'aljasonch_accent';
const MODE_KEY = 'aljasonch_mode';

const getInitialMode = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(MODE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  // Fall back to the OS preference
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

export const ThemeProvider = ({ children }) => {
  const [accentId, setAccentId] = useState(() => {
    if (typeof window === 'undefined') return 'emerald';
    return localStorage.getItem(ACCENT_KEY) || 'emerald';
  });
  const [mode, setMode] = useState(getInitialMode);

  const applyAccent = useCallback((id) => {
    const accent = ACCENTS.find((a) => a.id === id) || ACCENTS[0];
    const root = document.documentElement;
    root.style.setProperty('--theme-accent', accent.hex);
    root.style.setProperty('--theme-accent-rgb', accent.rgb);
    root.style.setProperty('--theme-on-accent', accent.on);
  }, []);

  useEffect(() => {
    applyAccent(accentId);
    localStorage.setItem(ACCENT_KEY, accentId);
  }, [accentId, applyAccent]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  const setAccent = useCallback((id) => setAccentId(id), []);
  const toggleMode = useCallback(() => setMode((m) => (m === 'dark' ? 'light' : 'dark')), []);
  const setThemeMode = useCallback((m) => setMode(m), []);

  const currentAccent = ACCENTS.find((a) => a.id === accentId) || ACCENTS[0];

  return (
    <ThemeContext.Provider
      value={{
        accentId,
        setAccent,
        currentAccent,
        accents: ACCENTS,
        mode,
        isDark: mode === 'dark',
        toggleMode,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
