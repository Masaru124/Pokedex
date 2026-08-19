'use client';

import { PokemonCardViewModel } from '@/types/pokemon';
import { PokemonCard } from './PokemonCard';
import { Loader2 } from 'lucide-react';
import { soundFx } from '@/lib/soundFx';

interface PokemonGridProps {
  items: PokemonCardViewModel[];
  onSelectPokemon: (name: string) => void;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  loadingMore: boolean;
  isShinyMode: boolean;
  compareList: PokemonCardViewModel[];
  onToggleCompare: (pokemon: PokemonCardViewModel) => void;
}

export function PokemonGrid({
  items,
  onSelectPokemon,
  isFavorite,
  onToggleFavorite,
  hasMore,
  onLoadMore,
  loadingMore,
  isShinyMode,
  compareList,
  onToggleCompare,
}: PokemonGridProps) {
  const compareIds = compareList.map((p) => p.id);

  return (
    <div className="space-y-8">
      {/* 4-column responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((pokemon) => (
          <PokemonCard
            key={`${pokemon.id}-${pokemon.name}`}
            pokemon={pokemon}
            onClick={() => onSelectPokemon(pokemon.name)}
            isFavorite={isFavorite(pokemon.id)}
            onToggleFavorite={() => onToggleFavorite(pokemon.id)}
            isShinyMode={isShinyMode}
            isCompared={compareIds.includes(pokemon.id)}
            onToggleCompare={() => onToggleCompare(pokemon)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-4 pb-8">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onLoadMore();
            }}
            disabled={loadingMore}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:from-red-500 hover:to-amber-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2.5 text-sm uppercase tracking-widest border border-amber-400/40"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>SCANNING POKÉDEX DATA...</span>
              </>
            ) : (
              <span>LOAD MORE POKÉMON</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
