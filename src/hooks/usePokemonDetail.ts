'use client';

import { useState, useEffect, useCallback } from 'react';
import { PokemonDetailViewModel } from '@/types/pokemon';
import { getPokemonDetail, ApiError } from '@/services/pokemonApi';

export function usePokemonDetail(nameOrId: string | number | null) {
  const [data, setData] = useState<PokemonDetailViewModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const fetchDetail = useCallback(async (signal?: AbortSignal) => {
    if (!nameOrId) {
      setData(null);
      setLoading(false);
      setError(null);
      setIsNotFound(false);
      return;
    }

    setLoading(true);
    setError(null);
    setIsNotFound(false);

    try {
      const result = await getPokemonDetail(nameOrId, signal);
      setData(result);
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      if (err instanceof ApiError && err.isNotFound) {
        setIsNotFound(true);
        setError(`No Pokémon found matching "${nameOrId}"`);
      } else {
        setError(err.message || 'Failed to load Pokémon details.');
      }
    } finally {
      setLoading(false);
    }
  }, [nameOrId]);

  useEffect(() => {
    const controller = new AbortController();
    fetchDetail(controller.signal);
    return () => controller.abort();
  }, [fetchDetail]);

  const retry = useCallback(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { data, loading, error, isNotFound, retry };
}
