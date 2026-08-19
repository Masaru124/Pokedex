'use client';

import { ReactNode } from 'react';
import { Volume2, VolumeX, Sparkles, Swords, Wifi, BatteryCharging, Sun, Moon } from 'lucide-react';
import { soundFx } from '@/lib/soundFx';

interface PokedexChassisProps {
  children: ReactNode;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  isShinyMode: boolean;
  onToggleShinyMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export function PokedexChassis({
  children,
  isSoundEnabled,
  onToggleSound,
  isShinyMode,
  onToggleShinyMode,
  isDarkMode,
  onToggleDarkMode,
  compareCount,
  onOpenCompare,
}: PokedexChassisProps) {
  return (
    <div className={`min-h-screen p-2 sm:p-4 md:p-6 lg:p-8 flex justify-center items-start transition-colors selection:bg-red-500 selection:text-white ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Handheld Pokédex Outer Casing */}
      <div className={`relative w-full max-w-7xl rounded-[2.5rem] p-3 sm:p-6 md:p-8 shadow-2xl border-4 overflow-hidden transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-b from-red-600 via-red-700 to-red-900 border-red-950 shadow-[0_25px_60px_-15px_rgba(220,38,38,0.4)]'
          : 'bg-gradient-to-b from-red-500 via-red-600 to-red-700 border-red-800 shadow-[0_25px_60px_-15px_rgba(239,68,68,0.3)]'
      }`}>
        {/* Metallic Bevel Highlights & Hinges */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Top Hardware Panel: Big Blue Camera Lens + LEDs */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b-2 border-red-900/60 mb-4 sm:mb-6">
          {/* Big Blue Lens & Sensor LEDs */}
          <div className="flex items-center gap-3">
            {/* Big Blue Lens */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-800 p-1.5 shadow-xl shadow-cyan-500/20 border-2 border-white/60">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-800 flex items-center justify-center relative overflow-hidden shadow-inner">
                {/* Lens reflection flare */}
                <div className="absolute top-1 left-2 w-4 h-2 rounded-full bg-white/70 blur-[1px]" />
                <div className="w-6 h-6 rounded-full bg-cyan-400/40 animate-ping" />
              </div>
            </div>

            {/* Indicator LEDs: Red, Yellow, Green */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border border-white/40 shadow-[0_0_8px_#ef4444] animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-amber-400 border border-white/40 shadow-[0_0_8px_#f59e0b]" />
              <div className="w-4 h-4 rounded-full bg-emerald-400 border border-white/40 shadow-[0_0_8px_#10b981]" />
            </div>
          </div>

          {/* Top Hardware Controls (Sound, Shiny, Dark/Light Mode, Compare Drawer) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={() => {
                onToggleDarkMode();
                soundFx.playClick();
              }}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl bg-red-900/60 text-amber-300 border border-red-800 hover:bg-red-900 transition-all shadow-md active:scale-95 flex items-center gap-1.5 text-xs font-bold"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-200" />
              )}
              <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              type="button"
              onClick={() => {
                onToggleSound();
                soundFx.playClick();
              }}
              title={isSoundEnabled ? 'Mute 8-bit Sound FX' : 'Enable 8-bit Sound FX'}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                isSoundEnabled
                  ? 'bg-amber-400 text-slate-900 border border-amber-300 shadow-amber-500/30'
                  : 'bg-red-900/60 text-red-200 border border-red-800 hover:bg-red-900'
              }`}
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">SFX</span>
            </button>

            {/* Shiny Sprite Mode Toggle */}
            <button
              type="button"
              onClick={() => {
                onToggleShinyMode();
                soundFx.playShiny();
              }}
              title="Toggle Shiny Pokémon Forms"
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                isShinyMode
                  ? 'bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-950 border border-yellow-200 shadow-yellow-400/40 animate-pulse'
                  : 'bg-red-900/60 text-amber-300 border border-red-800 hover:bg-red-900'
              }`}
            >
              <Sparkles className="w-4 h-4 fill-amber-300" />
              <span className="hidden sm:inline">Shiny</span>
            </button>

            {/* Compare Drawer Button */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onOpenCompare();
              }}
              title="Open Battle Comparison Terminal"
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                compareCount > 0
                  ? 'bg-cyan-500 text-white border border-cyan-400 shadow-cyan-500/40 animate-bounce'
                  : 'bg-red-900/60 text-slate-200 border border-red-800 hover:bg-red-900'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span className="hidden sm:inline">Compare</span>
              {compareCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-white text-slate-900 font-extrabold text-[10px]">
                  {compareCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Screen Frame Container */}
        <div className={`relative rounded-3xl p-3 sm:p-5 border-4 transition-colors duration-300 overflow-hidden ${
          isDarkMode
            ? 'bg-slate-900 border-slate-950 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]'
            : 'bg-slate-50 border-slate-300 shadow-[inset_0_4px_12px_rgba(0,0,0,0.1)]'
        }`}>
          {/* Top Screen HUD Bar */}
          <div className={`flex items-center justify-between px-3 py-1.5 rounded-t-xl text-[11px] font-mono border-b mb-3 ${
            isDarkMode
              ? 'bg-slate-950/80 text-cyan-400 border-cyan-900/40'
              : 'bg-slate-200/90 text-slate-800 border-slate-300'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold tracking-wider uppercase">POKÉDEX V4.2 ONLINE</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="hidden sm:inline flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-400" /> PokéAPI 2.0
              </span>
              <span className="flex items-center gap-1 text-emerald-500 font-bold">
                <BatteryCharging className="w-3.5 h-3.5" /> 99%
              </span>
            </div>
          </div>

          {/* Inner Screen Content */}
          <div className="relative z-10">{children}</div>
        </div>

        {/* Bottom Hardware Panel (D-Pad & Speaker Grills) */}
        <div className="mt-4 sm:mt-6 pt-4 border-t-2 border-red-900/60 flex items-center justify-between text-xs text-red-200 font-mono">
          <div className="flex items-center gap-4">
            {/* Tactile D-Pad visual */}
            <div className="relative w-12 h-12 bg-slate-900 rounded-xl p-1 shadow-inner border border-slate-800 hidden sm:flex items-center justify-center">
              <div className="w-10 h-3 bg-slate-700 rounded-sm absolute" />
              <div className="h-10 w-3 bg-slate-700 rounded-sm absolute" />
              <div className="w-2 h-2 rounded-full bg-slate-950 z-10" />
            </div>
            <span className="hidden md:inline text-red-200/80 font-bold">
              SILPH CO. POKÉDEX SYSTEM
            </span>
          </div>

          {/* Speaker Vent Lines */}
          <div className="flex gap-1">
            <div className="w-1.5 h-8 bg-red-950/80 rounded-full" />
            <div className="w-1.5 h-8 bg-red-950/80 rounded-full" />
            <div className="w-1.5 h-8 bg-red-950/80 rounded-full" />
            <div className="w-1.5 h-8 bg-red-950/80 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
