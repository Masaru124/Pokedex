'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { PokemonCardViewModel, PokemonType, SortOption } from '@/types/pokemon';
import { getEnrichedList, getEnrichedListByType, getPokemonDetail, searchPokemonPartial, ApiError } from '@/services/pokemonApi';

interface UsePokemonListParams {
  searchQuery: string;
  typeFilter: string; // 'all' or PokemonType
  sortBy: SortOption;
  favoritesOnly: boolean;
  favoriteIds: number[];
}

export function usePokemonList({
  searchQuery,
  typeFilter,
  sortBy,
  favoritesOnly,
  favoriteIds,
}: UsePokemonListParams) {
  const [items, setItems] = useState<PokemonCardViewModel[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Track latest request ID to prevent race conditions
  const requestIdRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchPokemon = useCallback(
    async (isInitial: boolean, currentOffset: number) => {
      const currentRequestId = ++requestIdRef.current;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      if (isInitial) {
        setLoading(true);
        setError(null);
        setIsNotFound(false);
      } else {
        setLoadingMore(true);
      }

      try {
        const trimmedSearch = searchQuery.trim().toLowerCase();

        // Mode 1: Search by partial name or ID (e.g. "pika", "char", "mew")
        if (trimmedSearch !== '') {
          const searchResult = await searchPokemonPartial(trimmedSearch, currentOffset, 20, controller.signal);
          if (requestIdRef.current === currentRequestId) {
            let filteredItems = searchResult.items;
            if (typeFilter !== 'all') {
              filteredItems = filteredItems.filter((item) =>
                item.types.includes(typeFilter as PokemonType)
              );
            }

            if (filteredItems.length === 0) {
              setItems([]);
              setIsNotFound(true);
              setHasMore(false);
              setTotalCount(0);
            } else {
              setItems((prev) => (isInitial ? filteredItems : [...prev, ...filteredItems]));
              setHasMore(searchResult.hasMore);
              setTotalCount(searchResult.total);
            }
          }
          return;
        }

        // Mode 2: Type filter mode
        if (typeFilter !== 'all') {
          const result = await getEnrichedListByType(typeFilter, currentOffset, 20, controller.signal);
          if (requestIdRef.current === currentRequestId) {
            setItems((prev) => (isInitial ? result.items : [...prev, ...result.items]));
            setHasMore(result.hasMore);
            setTotalCount(result.total);
          }
          return;
        }

        // Mode 3: Normal 'all' paginated list
        const result = await getEnrichedList(currentOffset, 20, controller.signal);
        if (requestIdRef.current === currentRequestId) {
          setItems((prev) => (isInitial ? result.items : [...prev, ...result.items]));
          setHasMore(result.hasMore);
          setTotalCount(result.total);
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        if (requestIdRef.current === currentRequestId) {
          if (err instanceof ApiError && err.isNotFound) {
            setIsNotFound(true);
          } else {
            setError(err.message || 'Failed to fetch Pokémon list. Please try again.');
          }
        }
      } finally {
        if (requestIdRef.current === currentRequestId) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [searchQuery, typeFilter]
  );

  // Trigger initial fetch when search or type filter changes
  useEffect(() => {
    setOffset(0);
    fetchPokemon(true, 0);
  }, [searchQuery, typeFilter, fetchPokemon]);

  // Load More handler
  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    const nextOffset = offset + 20;
    setOffset(nextOffset);
    fetchPokemon(false, nextOffset);
  }, [loading, loadingMore, hasMore, offset, fetchPokemon]);

  // Retry handler
  const retry = useCallback(() => {
    fetchPokemon(true, 0);
  }, [fetchPokemon]);

  // Apply sorting & favorites filtering over currently loaded items
  const processedItems = useMemo(() => {
    let result = [...items];

    if (favoritesOnly) {
      result = result.filter((item) => favoriteIds.includes(item.id));
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'id-asc':
          return a.id - b.id;
        case 'id-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'attack-desc':
          return b.baseAttack - a.baseAttack;
        case 'defense-desc':
          return b.baseDefense - a.baseDefense;
        case 'speed-desc':
          return b.baseSpeed - a.baseSpeed;
        case 'hp-desc':
          return b.baseHp - a.baseHp;
        default:
          return a.id - b.id;
      }
    });

    return result;
  }, [items, favoritesOnly, favoriteIds, sortBy]);

  return {
    items: processedItems,
    loading,
    loadingMore,
    error,
    isNotFound,
    hasMore: favoritesOnly ? false : hasMore,
    loadMore,
    retry,
    totalCount,
  };
}
