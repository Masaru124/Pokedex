'use client';

import { SearchBar } from './SearchBar';
import { TypeFilter } from './TypeFilter';
import { SortSelect } from './SortSelect';
import { SortOption } from '@/types/pokemon';
import { Heart, Sparkles, Swords, Sun, Moon } from 'lucide-react';
import { soundFx } from '@/lib/soundFx';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  favoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  isShinyMode: boolean;
  onToggleShinyMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  favoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  isSoundEnabled,
  onToggleSound,
  isShinyMode,
  onToggleShinyMode,
  isDarkMode,
  onToggleDarkMode,
  compareCount,
  onOpenCompare,
}: HeaderProps) {
  return (
    <header className={`p-4 space-y-4 rounded-2xl mb-6 shadow-xl border transition-colors duration-300 ${
      isDarkMode
        ? 'bg-slate-950/90 border-red-900/40'
        : 'bg-white/95 border-slate-200 shadow-slate-300/50'
    }`}>
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-red-500/30 transform hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-5 h-5 fill-slate-950 animate-spin" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-red-500 via-amber-500 to-red-600 bg-clip-text text-transparent uppercase font-mono">
              POKÉDEX V4 TERMINAL
            </h1>
            <p className="text-xs font-mono hidden sm:block opacity-75">
              Silph Co. Interactive Biometric & Stats Analyzer
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={() => {
              onToggleDarkMode();
              soundFx.playClick();
            }}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className={`p-2 rounded-xl text-xs font-bold transition-all border ${
              isDarkMode
                ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Favorites Button */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onToggleFavoritesOnly();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all border ${
              favoritesOnly
                ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/40 scale-105'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-rose-400'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${favoritesOnly ? 'fill-white' : ''}`} />
            <span className="hidden xs:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span
                className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  favoritesOnly
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-500/20 text-rose-500'
                }`}
              >
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Shiny Form Toggle */}
          <button
            type="button"
            onClick={() => {
              onToggleShinyMode();
              soundFx.playShiny();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all border ${
              isShinyMode
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/40 animate-pulse'
                : isDarkMode
                ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-amber-600 border-slate-300 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 fill-amber-300" />
            <span className="hidden sm:inline">Shiny</span>
          </button>

          {/* Battle Compare Button */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onOpenCompare();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all border ${
              compareCount > 0
                ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/40'
                : isDarkMode
                ? 'bg-slate-800 text-cyan-300 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-cyan-700 border-slate-300 hover:bg-slate-200'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span className="hidden sm:inline">Compare</span>
            {compareCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-white text-slate-950 font-bold text-[10px]">
                {compareCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Control Inputs Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <div className="flex items-center gap-2">
          <TypeFilter selectedType={selectedType} onChange={onTypeChange} />
          <SortSelect value={sortBy} onChange={onSortChange} />
        </div>
      </div>
    </header>
  );
}
