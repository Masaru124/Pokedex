'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({
  message = "We couldn't load the Pokémon right now. Please check your internet connection.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center shadow-inner">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
          Something went wrong
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        aria-label="Try loading Pokémon again"
        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white font-bold rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
