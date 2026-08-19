'use client';

import { useEffect, useState } from 'react';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { getTypeColor, capitalize } from '@/lib/typeColors';
import { TypewriterText } from './TypewriterText';
import { X, Heart, Ruler, Weight, Zap, Shield, Sparkles, ChevronDown, ChevronUp, User, Volume2, Cpu, AlertTriangle } from 'lucide-react';
import { soundFx } from '@/lib/soundFx';

interface PokemonModalProps {
  pokemonName: string | null;
  onClose: () => void;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  isShinyMode?: boolean;
}

export function PokemonModal({
  pokemonName,
  onClose,
  isFavorite,
  onToggleFavorite,
  isShinyMode: initialShiny = false,
}: PokemonModalProps) {
  const { data: pokemon, loading, error, retry } = usePokemonDetail(pokemonName);
  const [showAllMoves, setShowAllMoves] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [isShiny, setIsShiny] = useState(initialShiny);

  useEffect(() => {
    setIsShiny(initialShiny);
  }, [initialShiny]);

  useEffect(() => {
    if (pokemon) {
      soundFx.playPokedexScan();
      soundFx.playPokemonCry(pokemon.id, pokemon.cryAudioUrl);
      const timer = setTimeout(() => setAnimateStats(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateStats(false);
    }
  }, [pokemon]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (pokemonName) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [pokemonName, onClose]);

  if (!pokemonName) return null;

  const primaryType = pokemon?.types[0] || 'normal';
  const typeConfig = getTypeColor(primaryType);
  const displayArtwork = isShiny ? pokemon?.shinyArtwork || pokemon?.artwork : pokemon?.artwork;

  // Trainer height comparison
  const trainerHeightM = 1.7;
  const pokemonHeightM = pokemon?.heightMeters || 1;
  const heightRatio = Math.min(2.5, Math.max(0.4, pokemonHeightM / trainerHeightM));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-lg animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Pokédex Mechanical Lid Doors (Opens on mount) */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-red-700 border-r-4 border-red-950 z-40 animate-doorLeft pointer-events-none shadow-2xl flex items-center justify-end pr-8">
        <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-red-500 animate-ping" />
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 w-1/2 bg-red-700 border-l-4 border-red-950 z-40 animate-doorRight pointer-events-none shadow-2xl flex items-center justify-start pl-8">
        <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-amber-400 animate-ping" />
        </div>
      </div>

      {/* Main Dual-Monitor Pokédex Terminal */}
      <div
        className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] bg-slate-900 text-slate-100 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-y-auto z-10 border-4 border-red-700 shadow-red-600/30 crt-overlay"
        style={{ boxShadow: `0 25px 70px -15px ${typeConfig.glow}` }}
      >
        {/* Sticky Top Hardware Status Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b-2 border-red-900/60 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-extrabold text-amber-400 tracking-wider">
              {pokemon?.formattedId || 'SCANNING ENTRY...'}
            </span>
            <span className="text-slate-500 hidden sm:inline">| BIOMETRIC DISPLAY</span>
          </div>

          <div className="flex items-center gap-2">
            {pokemon && (
              <>
                {/* Play Official Pokémon Cry Audio */}
                <button
                  type="button"
                  onClick={() => soundFx.playPokemonCry(pokemon.id, pokemon.cryAudioUrl)}
                  className="px-2.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                  title="Play Official Pokémon Cry Audio"
                >
                  <Volume2 className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                  <span>PLAY CRY</span>
                </button>

                {/* Shiny Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playShiny();
                    setIsShiny(!isShiny);
                  }}
                  className={`p-1.5 rounded-full transition-colors ${
                    isShiny
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-amber-400 bg-slate-800 hover:bg-slate-700'
                  }`}
                  title="Toggle Shiny Artwork"
                >
                  <Sparkles className="w-4 h-4" />
                </button>

                {/* Favorite Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onToggleFavorite(pokemon.id);
                  }}
                  className={`p-1.5 rounded-full transition-colors ${
                    isFavorite(pokemon.id)
                      ? 'text-rose-500 bg-rose-500/20'
                      : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
                  }`}
                  title="Toggle Favorite"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(pokemon.id) ? 'fill-rose-500' : ''}`} />
                </button>
              </>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-16 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="relative w-20 h-20">
              <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
              <Cpu className="w-8 h-8 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <p className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest animate-pulse">
              ANALYZING POKÉMON MOLECULAR STRUCTURE...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <p className="text-slate-300 font-mono text-sm">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider"
            >
              RETRY SPECIES SCAN
            </button>
          </div>
        )}

        {/* Pokemon Detail Content */}
        {pokemon && !loading && (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Dual Screen Display Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Left Monitor (Primary Holographic Artwork Scanner) */}
              <div
                className="md:col-span-5 relative p-6 rounded-2xl flex flex-col items-center justify-center overflow-hidden border-2 border-cyan-500/40 bg-slate-950 shadow-inner"
                style={{ backgroundColor: typeConfig.darkBgTint }}
              >
                {/* Glowing Laser Scanline Beam Sweeping down */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] z-20 animate-laserScan pointer-events-none" />

                {/* Ambient Type Glow */}
                <div
                  className="absolute w-44 h-44 rounded-full blur-3xl opacity-40 pointer-events-none"
                  style={{ backgroundColor: typeConfig.hex }}
                />

                {/* Rotating Pokéball Background Scanner Grid */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <div className="w-48 h-48 rounded-full border-4 border-dashed border-cyan-400 animate-pokeballSpin" />
                </div>

                {/* High-res Artwork Image */}
                <img
                  src={displayArtwork}
                  alt={pokemon.name}
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] z-10 hover:scale-105 transition-transform duration-300"
                />

                <div className="mt-3 text-center z-10">
                  <h2 className="text-2xl font-black text-white capitalize tracking-tight font-mono">
                    {pokemon.name}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                    {pokemon.types.map((type) => {
                      const cfg = getTypeColor(type);
                      return (
                        <span
                          key={type}
                          className="px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1"
                          style={{
                            backgroundColor: cfg.badgeBg,
                            color: cfg.badgeText,
                          }}
                        >
                          <cfg.Icon className="w-3.5 h-3.5" />
                          <span>{capitalize(type)}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Monitor (Secondary Data Readout & Typewriter Bio) */}
              <div className="md:col-span-7 space-y-4">
                {/* Pokédex Typewriter Description Entry */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/60 font-mono text-xs text-cyan-300 space-y-1.5 shadow-inner">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest border-b border-cyan-900/40 pb-1">
                    <span>SILPH CO. BIOMETRIC LOG ENTRY</span>
                    <span>STATUS: VERIFIED</span>
                  </div>
                  <p className="min-h-[48px] leading-relaxed pt-1">
                    <TypewriterText
                      text={`${capitalize(pokemon.name)} is a ${pokemon.types.map(t => capitalize(t)).join('/')} type Pokémon with a base attack rating of ${pokemon.baseAttack} and base speed rating of ${pokemon.baseSpeed}. Height measures ${pokemon.heightMeters}m with total body mass of ${pokemon.weightKg}kg.`}
                      speed={18}
                    />
                  </p>
                </div>

                {/* Quick Info Matrix: Weight & Abilities */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1 mb-0.5">
                      <Weight className="w-3 h-3 text-blue-400" /> Mass Rating
                    </span>
                    <span className="text-xs font-bold text-slate-100 font-mono">
                      {pokemon.weightKg} kg ({pokemon.weightLbs} lbs)
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1 mb-0.5">
                      <Sparkles className="w-3 h-3 text-rose-400" /> Abilities
                    </span>
                    <div className="flex flex-wrap justify-center gap-1">
                      {pokemon.abilities.map((ability) => (
                        <span
                          key={ability.name}
                          className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                            ability.isHidden
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                              : 'text-slate-200'
                          }`}
                        >
                          {ability.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trainer Height Scale */}
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <Ruler className="w-3 h-3" /> Height Scale vs Trainer (1.7m)
                    </span>
                    <span>{pokemon.heightMeters} m ({pokemon.heightFeet})</span>
                  </div>
                  <div className="flex items-end justify-center gap-6 h-16 pt-1 border-t border-slate-900">
                    <div className="flex flex-col items-center text-[9px] text-slate-500 font-mono">
                      <User className="w-8 h-12 text-slate-600" />
                      <span>Trainer (1.7m)</span>
                    </div>
                    <div className="flex flex-col items-center text-[9px] text-amber-400 font-bold font-mono">
                      <img
                        src={pokemon.sprite}
                        alt={pokemon.name}
                        className="object-contain"
                        style={{ height: `${Math.round(36 * heightRatio)}px` }}
                      />
                      <span>{pokemon.name} ({pokemon.heightMeters}m)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Base Stats Matrix Section */}
            <div className="space-y-2.5">
              <h3 className="text-sm font-extrabold uppercase font-mono tracking-widest text-amber-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Base Combat Stat Analytics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                {pokemon.stats.map((stat) => {
                  const percentage = Math.min(100, Math.round((stat.value / stat.max) * 100));
                  return (
                    <div key={stat.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono font-bold">
                        <span className="text-slate-400">{stat.displayName}</span>
                        <span className="text-amber-400">{stat.value}</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div
                          className="h-full rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: animateStats ? `${percentage}%` : '0%',
                            backgroundColor: typeConfig.hex,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Known Moves Deck Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold uppercase font-mono tracking-widest text-indigo-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  Known Moves ({pokemon.moves.length})
                </h3>
                {pokemon.moves.length > 8 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setShowAllMoves(!showAllMoves);
                    }}
                    className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    {showAllMoves ? (
                      <>
                        Show Less <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        Show All ({pokemon.moves.length}) <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
                {(showAllMoves ? pokemon.moves : pokemon.moves.slice(0, 8)).map((move) => (
                  <span
                    key={move}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-xs font-mono font-medium border border-slate-800"
                  >
                    {move}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
