'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pokemon_explorer_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to read favorites from localStorage:', e);
    }
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save favorites to localStorage:', e);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
