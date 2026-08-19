'use client';

import { SortOption } from '@/types/pokemon';
import { ArrowUpDown } from 'lucide-react';
import { soundFx } from '@/lib/soundFx';

interface SortSelectProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative min-w-[150px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-400">
        <ArrowUpDown className="w-4 h-4" />
      </div>
      <select
        value={value}
        onChange={(e) => {
          soundFx.playClick();
          onChange(e.target.value as SortOption);
        }}
        aria-label="Sort Pokémon"
        className="w-full pl-9 pr-8 py-2.5 bg-slate-900 text-slate-100 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-200 text-sm font-mono cursor-pointer shadow-inner appearance-none"
      >
        <option value="id-asc" className="bg-slate-900">Lowest ID (#1)</option>
        <option value="id-desc" className="bg-slate-900">Highest ID</option>
        <option value="name-asc" className="bg-slate-900">Name (A-Z)</option>
        <option value="attack-desc" className="bg-slate-900">Top Attack</option>
        <option value="defense-desc" className="bg-slate-900">Top Defense</option>
        <option value="speed-desc" className="bg-slate-900">Top Speed</option>
        <option value="hp-desc" className="bg-slate-900">Top HP</option>
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}
