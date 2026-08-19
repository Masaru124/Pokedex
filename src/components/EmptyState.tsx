'use client';

import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onResetFilters?: () => void;
}

export function EmptyState({
  title = 'No Pokémon found',
  message = 'Try searching for a different Pokémon or clearing active filters.',
  onResetFilters,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center shadow-inner">
        <SearchX className="w-8 h-8" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
      </div>
      {onResetFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          aria-label="Clear active search and filters"
          className="px-5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
