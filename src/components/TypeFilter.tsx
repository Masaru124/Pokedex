'use client';

import { ALL_POKEMON_TYPES } from '@/types/pokemon';
import { getTypeColor, capitalize } from '@/lib/typeColors';
import { Filter } from 'lucide-react';
import { soundFx } from '@/lib/soundFx';

interface TypeFilterProps {
  selectedType: string;
  onChange: (type: string) => void;
}

export function TypeFilter({ selectedType, onChange }: TypeFilterProps) {
  return (
    <div className="relative min-w-[160px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400">
        <Filter className="w-4 h-4" />
      </div>
      <select
        value={selectedType}
        onChange={(e) => {
          soundFx.playClick();
          onChange(e.target.value);
        }}
        aria-label="Filter Pokémon by type"
        className="w-full pl-9 pr-8 py-2.5 bg-slate-900 text-slate-100 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-200 text-sm font-mono cursor-pointer shadow-inner appearance-none capitalize"
      >
        <option value="all" className="bg-slate-900 text-slate-100">
          All Types
        </option>
        {ALL_POKEMON_TYPES.map((type) => {
          const config = getTypeColor(type);
          return (
            <option
              key={type}
              value={type}
              className="bg-slate-900 text-slate-100"
            >
              {capitalize(type)}
            </option>
          );
        })}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}
