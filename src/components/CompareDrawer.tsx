'use client';

import { PokemonCardViewModel } from '@/types/pokemon';
import { getTypeColor, capitalize } from '@/lib/typeColors';
import { X, Swords, Trophy, Zap, Shield, Heart } from 'lucide-react';
import { soundFx } from '@/lib/soundFx';

interface CompareDrawerProps {
  compareList: PokemonCardViewModel[];
  onRemoveCompare: (id: number) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CompareDrawer({
  compareList,
  onRemoveCompare,
  onClearAll,
  isOpen,
  onClose,
}: CompareDrawerProps) {
  if (!isOpen) return null;

  const p1 = compareList[0];
  const p2 = compareList[1];

  const getWinner = (val1: number, val2: number) => {
    if (val1 > val2) return 1;
    if (val2 > val1) return 2;
    return 0;
  };

  const statRows = [
    { label: 'HP', icon: Heart, val1: p1?.baseHp || 0, val2: p2?.baseHp || 0 },
    { label: 'Attack', icon: Swords, val1: p1?.baseAttack || 0, val2: p2?.baseAttack || 0 },
    { label: 'Defense', icon: Shield, val1: p1?.baseDefense || 0, val2: p2?.baseDefense || 0 },
    { label: 'Sp. Atk', icon: Zap, val1: p1?.baseSpAtk || 0, val2: p2?.baseSpAtk || 0 },
    { label: 'Sp. Def', icon: Shield, val1: p1?.baseSpDef || 0, val2: p2?.baseSpDef || 0 },
    { label: 'Speed', icon: Zap, val1: p1?.baseSpeed || 0, val2: p2?.baseSpeed || 0 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 text-slate-100 rounded-3xl border-4 border-red-600/80 shadow-2xl shadow-red-600/40 overflow-y-auto z-10 p-6 space-y-6 crt-overlay">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 text-white shadow-lg shadow-red-500/30">
              <Swords className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2 font-mono uppercase">
                BATTLE COMPARISON TERMINAL
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Select 2 Pokémon from grid cards using compare button to compare stats
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onClearAll();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold font-mono transition-colors border border-slate-700"
              >
                Clear Selected
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Selected Pokémon Cards (Slots 1 & 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[p1, p2].map((p, idx) => {
            if (!p) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/60 text-center space-y-2 min-h-[220px]"
                >
                  <Swords className="w-10 h-10 opacity-40 text-slate-400" />
                  <p className="text-xs font-bold font-mono text-amber-400">
                    Slot {idx + 1}: Empty
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono max-w-xs">
                    Click the compare button on any Pokémon card in the Pokédex grid to add it to comparison!
                  </p>
                </div>
              );
            }
            const typeCfg = getTypeColor(p.types[0]);
            return (
              <div
                key={p.id}
                className="relative flex flex-col items-center p-5 rounded-2xl border-2 border-slate-700 bg-slate-950/80 overflow-hidden shadow-lg"
                style={{ backgroundColor: typeCfg.darkBgTint }}
              >
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onRemoveCompare(p.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>
                <img
                  src={p.artwork}
                  alt={p.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain filter drop-shadow-xl hover:scale-105 transition-transform"
                />
                <span className="text-xs font-mono font-extrabold text-amber-400 mt-2">
                  {p.formattedId}
                </span>
                <h3 className="text-lg font-black capitalize text-white font-mono">
                  {p.name}
                </h3>
                <div className="flex gap-1.5 mt-2">
                  {p.types.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                      style={{
                        backgroundColor: getTypeColor(t).badgeBg,
                        color: getTypeColor(t).badgeText,
                      }}
                    >
                      {capitalize(t)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stat Comparison Matrix */}
        {p1 && p2 ? (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 text-center font-mono">
              Base Combat Analytics Comparison Matrix
            </h3>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              {statRows.map((row) => {
                const winner = getWinner(row.val1, row.val2);
                const Icon = row.icon;

                return (
                  <div key={row.label} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold font-mono">
                      <span
                        className={`flex items-center gap-1 font-mono ${
                          winner === 1 ? 'text-amber-400 font-extrabold' : 'text-slate-300'
                        }`}
                      >
                        {winner === 1 && <Trophy className="w-3.5 h-3.5 text-amber-400 inline animate-bounce" />}
                        {row.val1}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Icon className="w-3.5 h-3.5 text-red-400" />
                        {row.label}
                      </span>
                      <span
                        className={`flex items-center gap-1 font-mono ${
                          winner === 2 ? 'text-amber-400 font-extrabold' : 'text-slate-300'
                        }`}
                      >
                        {row.val2}
                        {winner === 2 && <Trophy className="w-3.5 h-3.5 text-amber-400 inline animate-bounce" />}
                      </span>
                    </div>

                    {/* Dual comparison progress bar */}
                    <div className="grid grid-cols-2 gap-2 h-3.5 bg-slate-900 rounded-full p-0.5 overflow-hidden border border-slate-800">
                      {/* Left bar (P1) */}
                      <div className="flex justify-end bg-slate-950 rounded-l-full overflow-hidden">
                        <div
                          className={`h-full rounded-l-full transition-all duration-500 ${
                            winner === 1 ? 'bg-amber-400' : 'bg-red-500/80'
                          }`}
                          style={{ width: `${Math.min(100, (row.val1 / 180) * 100)}%` }}
                        />
                      </div>

                      {/* Right bar (P2) */}
                      <div className="flex justify-start bg-slate-950 rounded-r-full overflow-hidden">
                        <div
                          className={`h-full rounded-r-full transition-all duration-500 ${
                            winner === 2 ? 'bg-amber-400' : 'bg-cyan-500/80'
                          }`}
                          style={{ width: `${Math.min(100, (row.val2 / 180) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-xs font-mono text-slate-500">
            Add 2 Pokémon to view automated stat winner calculations.
          </div>
        )}
      </div>
    </div>
  );
}
