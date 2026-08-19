'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { soundFx } from '@/lib/soundFx';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search Pokémon by name or ID...',
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        soundFx.playScan();
        onChange(inputValue);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue, onChange, value]);

  const handleClear = () => {
    soundFx.playClick();
    setInputValue('');
    onChange('');
  };

  return (
    <div className="relative flex-1 min-w-[240px]">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search Pokémon by name or ID"
        className="w-full pl-10 pr-10 py-2.5 bg-slate-900 text-slate-100 placeholder-slate-500 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-200 text-sm font-mono shadow-inner"
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
