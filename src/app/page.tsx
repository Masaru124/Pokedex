'use client';

import { useState } from 'react';
import { usePokemonList } from '@/hooks/usePokemonList';
import { useFavorites } from '@/hooks/useFavorites';
import { useDarkMode } from '@/hooks/useDarkMode';
import { PokemonCardViewModel, SortOption } from '@/types/pokemon';
import { PokedexChassis } from '@/components/PokedexChassis';
import { Header } from '@/components/Header';
import { PokemonGrid } from '@/components/PokemonGrid';
import { PokemonModal } from '@/components/PokemonModal';
import { CompareDrawer } from '@/components/CompareDrawer';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { soundFx } from '@/lib/soundFx';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('id-asc');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  // High-tech Pokédex features
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isShinyMode, setIsShinyMode] = useState<boolean>(false);
  const [compareList, setCompareList] = useState<PokemonCardViewModel[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const {
    items,
    loading,
    loadingMore,
    error,
    isNotFound,
    hasMore,
    loadMore,
    retry,
  } = usePokemonList({
    searchQuery,
    typeFilter: selectedType,
    sortBy,
    favoritesOnly,
    favoriteIds: favorites,
  });

  const handleToggleSound = () => {
    const next = !isSoundEnabled;
    setIsSoundEnabled(next);
    soundFx.setEnabled(next);
  };

  const handleToggleShiny = () => {
    setIsShinyMode(!isShinyMode);
  };

  const handleToggleCompare = (pokemon: PokemonCardViewModel) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === pokemon.id);
      if (exists) {
        return prev.filter((p) => p.id !== pokemon.id);
      }
      if (prev.length >= 2) {
        return [prev[1], pokemon]; // replace oldest
      }
      return [...prev, pokemon];
    });
  };

  const handleRemoveCompareById = (id: number) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleResetFilters = () => {
    soundFx.playClick();
    setSearchQuery('');
    setSelectedType('all');
    setSortBy('id-asc');
    setFavoritesOnly(false);
  };

  return (
    <PokedexChassis
      isSoundEnabled={isSoundEnabled}
      onToggleSound={handleToggleSound}
      isShinyMode={isShinyMode}
      onToggleShinyMode={handleToggleShiny}
      isDarkMode={isDarkMode}
      onToggleDarkMode={toggleDarkMode}
      compareCount={compareList.length}
      onOpenCompare={() => setIsCompareOpen(true)}
    >
      {/* Pokédex Header Console */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        sortBy={sortBy}
        onSortChange={setSortBy}
        favoritesOnly={favoritesOnly}
        onToggleFavoritesOnly={() => setFavoritesOnly(!favoritesOnly)}
        favoritesCount={favorites.length}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
        isShinyMode={isShinyMode}
        onToggleShinyMode={handleToggleShiny}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        compareCount={compareList.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Active Filter Badges */}
      {(searchQuery || selectedType !== 'all' || favoritesOnly) && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-mono font-semibold text-slate-400 px-1">
          <span>Active Scans:</span>
          {searchQuery && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Query: &quot;{searchQuery}&quot;
            </span>
          )}
          {selectedType !== 'all' && (
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 capitalize">
              Type: {selectedType}
            </span>
          )}
          {favoritesOnly && (
            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Favorites Only ({favorites.length})
            </span>
          )}
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-amber-400 hover:underline ml-1 font-bold"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Screen Content States */}
      {loading && items.length === 0 && <LoadingSkeleton count={12} />}

      {error && items.length === 0 && !loading && (
        <ErrorState message={error} onRetry={retry} />
      )}

      {(isNotFound || (items.length === 0 && !loading && !error)) && (
        <EmptyState
          title={
            favoritesOnly && favorites.length === 0
              ? 'No Favorites Saved Yet'
              : 'No Pokémon Match Search'
          }
          message={
            favoritesOnly && favorites.length === 0
              ? 'Click the heart icon on any Pokémon card to save it to your handheld favorites memory!'
              : `Zero matches found in Silph Co. database for current search query and filters.`
          }
          onResetFilters={handleResetFilters}
        />
      )}

      {items.length > 0 && (
        <PokemonGrid
          items={items}
          onSelectPokemon={setSelectedPokemon}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          hasMore={hasMore}
          onLoadMore={loadMore}
          loadingMore={loadingMore}
          isShinyMode={isShinyMode}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
        />
      )}

      {/* Pokémon Detail Modal */}
      <PokemonModal
        pokemonName={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        isShinyMode={isShinyMode}
      />

      {/* Battle Comparison Terminal */}
      <CompareDrawer
        compareList={compareList}
        onRemoveCompare={handleRemoveCompareById}
        onClearAll={() => setCompareList([])}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </PokedexChassis>
  );
}
