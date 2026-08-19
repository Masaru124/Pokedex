'use client';

import { useState } from 'react';
import { PokemonCardViewModel } from '@/types/pokemon';
import { getTypeColor, capitalize } from '@/lib/typeColors';
import { Heart, Swords, Sparkles, Zap, Shield } from 'lucide-react';
import { soundFx } from '@/lib/soundFx';

interface PokemonCardProps {
  pokemon: PokemonCardViewModel;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  isShinyMode?: boolean;
  isCompared?: boolean;
  onToggleCompare?: (e: React.MouseEvent) => void;
}

export function PokemonCard({
  pokemon,
  onClick,
  isFavorite,
  onToggleFavorite,
  isShinyMode = false,
  isCompared = false,
  onToggleCompare,
}: PokemonCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const primaryType = pokemon.types[0] || 'normal';
  const typeConfig = getTypeColor(primaryType);

  // Mouse move 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setRotate({ x: -y / 12, y: x / 12 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const currentArtwork = isShinyMode ? pokemon.shinyArtwork : pokemon.artwork;

  return (
    <div
      onClick={() => {
        soundFx.playOpen();
        onClick();
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          soundFx.playOpen();
          onClick();
        }
      }}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        backgroundColor: typeConfig.darkBgTint,
      }}
      className="group relative flex flex-col justify-between p-4 rounded-2xl border border-slate-700/80 hover:border-amber-400/80 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 overflow-hidden select-none"
    >
      {/* Glossy Holographic Hologram sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Dynamic Type Color Glow Accent */}
      <div
        className="absolute -right-12 -bottom-12 w-36 h-36 rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: typeConfig.hex }}
      />

      {/* Top Header: ID, Compare Checkbox, Favorite Heart */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-extrabold tracking-wider text-amber-400 font-mono">
            {pokemon.formattedId}
          </span>
          {isShinyMode && (
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Battle Compare Checkbox */}
          {onToggleCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick();
                onToggleCompare(e);
              }}
              title={isCompared ? 'Remove from Battle Comparison' : 'Add to Battle Comparison'}
              className={`p-1.5 rounded-full transition-all ${
                isCompared
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/40 scale-110'
                  : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Favorite Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              onToggleFavorite(e);
            }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-1.5 rounded-full transition-all ${
              isFavorite
                ? 'text-rose-500 bg-rose-500/20 scale-110'
                : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Center Image Container */}
      <div className="relative w-full aspect-square my-2 flex items-center justify-center z-10">
        {currentArtwork ? (
          <img
            src={currentArtwork}
            alt={pokemon.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain filter drop-shadow-xl group-hover:scale-110 group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
            No sprite
          </div>
        )}
      </div>

      {/* Card Bottom: Name, Type Badges, Quick Stats */}
      <div className="space-y-2 z-10">
        <h2 className="text-base sm:text-lg font-bold text-slate-100 capitalize tracking-tight line-clamp-1 group-hover:text-amber-300 transition-colors">
          {pokemon.name}
        </h2>

        {/* Type Badges */}
        <div className="flex flex-wrap gap-1.5">
          {pokemon.types.map((type) => {
            const config = getTypeColor(type);
            return (
              <span
                key={type}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-sm flex items-center gap-1"
                style={{
                  backgroundColor: config.badgeBg,
                  color: config.badgeText,
                }}
              >
                <span>{config.icon}</span>
                <span>{capitalize(type)}</span>
              </span>
            );
          })}
        </div>

        {/* Quick Stats Bar Gauges */}
        <div className="grid grid-cols-3 gap-1 pt-1.5 text-[10px] font-mono text-slate-400 border-t border-slate-700/60">
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>ATK {pokemon.baseAttack}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-blue-400" />
            <span>DEF {pokemon.baseDefense}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>SPD {pokemon.baseSpeed}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
