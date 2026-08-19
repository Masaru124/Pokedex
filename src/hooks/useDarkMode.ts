'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pokemon_explorer_dark_mode';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = stored !== null ? JSON.parse(stored) : prefersDark;
      
      setIsDarkMode(initial);
      if (initial) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Failed to initialize dark mode:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save dark mode setting:', e);
      }
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  }, []);

  return { isDarkMode, toggleDarkMode, isLoaded };
}
