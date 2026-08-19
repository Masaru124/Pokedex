import { PokemonType } from '@/types/pokemon';
import {
  Flame,
  Droplets,
  Leaf,
  Zap,
  Eye,
  Ghost,
  Snowflake,
  Sparkles,
  Moon,
  Circle,
  Swords,
  Skull,
  Mountain,
  Feather,
  Bug,
  Box,
  Shield,
  Sun,
  LucideIcon,
} from 'lucide-react';

export interface TypeColorConfig {
  hex: string;
  gradient: string;
  bgTint: string;
  darkBgTint: string;
  badgeBg: string;
  badgeText: string;
  border: string;
  glow: string;
  Icon: LucideIcon;
}

export const TYPE_COLORS: Record<PokemonType, TypeColorConfig> = {
  fire: {
    hex: '#EF4444',
    gradient: 'from-amber-500 via-orange-500 to-red-600',
    bgTint: 'rgba(239, 68, 68, 0.12)',
    darkBgTint: 'rgba(239, 68, 68, 0.2)',
    badgeBg: '#EF4444',
    badgeText: '#FFFFFF',
    border: 'rgba(239, 68, 68, 0.4)',
    glow: 'rgba(239, 68, 68, 0.35)',
    Icon: Flame,
  },
  water: {
    hex: '#3B82F6',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    bgTint: 'rgba(59, 130, 246, 0.12)',
    darkBgTint: 'rgba(59, 130, 246, 0.2)',
    badgeBg: '#3B82F6',
    badgeText: '#FFFFFF',
    border: 'rgba(59, 130, 246, 0.4)',
    glow: 'rgba(59, 130, 246, 0.35)',
    Icon: Droplets,
  },
  grass: {
    hex: '#10B981',
    gradient: 'from-emerald-400 via-green-500 to-teal-600',
    bgTint: 'rgba(16, 185, 129, 0.12)',
    darkBgTint: 'rgba(16, 185, 129, 0.2)',
    badgeBg: '#10B981',
    badgeText: '#FFFFFF',
    border: 'rgba(16, 185, 129, 0.4)',
    glow: 'rgba(16, 185, 129, 0.35)',
    Icon: Leaf,
  },
  electric: {
    hex: '#EAB308',
    gradient: 'from-amber-300 via-yellow-400 to-amber-500',
    bgTint: 'rgba(234, 179, 8, 0.14)',
    darkBgTint: 'rgba(234, 179, 8, 0.22)',
    badgeBg: '#EAB308',
    badgeText: '#0F172A',
    border: 'rgba(234, 179, 8, 0.5)',
    glow: 'rgba(234, 179, 8, 0.4)',
    Icon: Zap,
  },
  psychic: {
    hex: '#EC4899',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-600',
    bgTint: 'rgba(236, 72, 153, 0.12)',
    darkBgTint: 'rgba(236, 72, 153, 0.2)',
    badgeBg: '#EC4899',
    badgeText: '#FFFFFF',
    border: 'rgba(236, 72, 153, 0.4)',
    glow: 'rgba(236, 72, 153, 0.35)',
    Icon: Eye,
  },
  ghost: {
    hex: '#8B5CF6',
    gradient: 'from-purple-600 via-indigo-600 to-violet-900',
    bgTint: 'rgba(139, 92, 246, 0.12)',
    darkBgTint: 'rgba(139, 92, 246, 0.22)',
    badgeBg: '#8B5CF6',
    badgeText: '#FFFFFF',
    border: 'rgba(139, 92, 246, 0.4)',
    glow: 'rgba(139, 92, 246, 0.35)',
    Icon: Ghost,
  },
  ice: {
    hex: '#06B6D4',
    gradient: 'from-sky-300 via-cyan-400 to-blue-500',
    bgTint: 'rgba(6, 182, 212, 0.12)',
    darkBgTint: 'rgba(6, 182, 212, 0.2)',
    badgeBg: '#06B6D4',
    badgeText: '#FFFFFF',
    border: 'rgba(6, 182, 212, 0.4)',
    glow: 'rgba(6, 182, 212, 0.35)',
    Icon: Snowflake,
  },
  dragon: {
    hex: '#6366F1',
    gradient: 'from-indigo-500 via-purple-600 to-pink-600',
    bgTint: 'rgba(99, 102, 241, 0.12)',
    darkBgTint: 'rgba(99, 102, 241, 0.22)',
    badgeBg: '#6366F1',
    badgeText: '#FFFFFF',
    border: 'rgba(99, 102, 241, 0.4)',
    glow: 'rgba(99, 102, 241, 0.35)',
    Icon: Sparkles,
  },
  dark: {
    hex: '#4B5563',
    gradient: 'from-slate-700 via-gray-800 to-slate-950',
    bgTint: 'rgba(75, 85, 99, 0.12)',
    darkBgTint: 'rgba(75, 85, 99, 0.28)',
    badgeBg: '#374151',
    badgeText: '#FFFFFF',
    border: 'rgba(75, 85, 99, 0.4)',
    glow: 'rgba(75, 85, 99, 0.35)',
    Icon: Moon,
  },
  fairy: {
    hex: '#F472B6',
    gradient: 'from-pink-300 via-rose-400 to-fuchsia-400',
    bgTint: 'rgba(244, 114, 182, 0.12)',
    darkBgTint: 'rgba(244, 114, 182, 0.2)',
    badgeBg: '#F472B6',
    badgeText: '#FFFFFF',
    border: 'rgba(244, 114, 182, 0.4)',
    glow: 'rgba(244, 114, 182, 0.35)',
    Icon: Sun,
  },
  normal: {
    hex: '#9CA3AF',
    gradient: 'from-stone-400 via-gray-400 to-slate-500',
    bgTint: 'rgba(156, 163, 175, 0.12)',
    darkBgTint: 'rgba(156, 163, 175, 0.2)',
    badgeBg: '#9CA3AF',
    badgeText: '#FFFFFF',
    border: 'rgba(156, 163, 175, 0.4)',
    glow: 'rgba(156, 163, 175, 0.35)',
    Icon: Circle,
  },
  fighting: {
    hex: '#DC2626',
    gradient: 'from-red-600 via-rose-700 to-red-900',
    bgTint: 'rgba(220, 38, 38, 0.12)',
    darkBgTint: 'rgba(220, 38, 38, 0.22)',
    badgeBg: '#DC2626',
    badgeText: '#FFFFFF',
    border: 'rgba(220, 38, 38, 0.4)',
    glow: 'rgba(220, 38, 38, 0.35)',
    Icon: Swords,
  },
  poison: {
    hex: '#A855F7',
    gradient: 'from-purple-500 via-fuchsia-600 to-purple-800',
    bgTint: 'rgba(168, 85, 247, 0.12)',
    darkBgTint: 'rgba(168, 85, 247, 0.2)',
    badgeBg: '#A855F7',
    badgeText: '#FFFFFF',
    border: 'rgba(168, 85, 247, 0.4)',
    glow: 'rgba(168, 85, 247, 0.35)',
    Icon: Skull,
  },
  ground: {
    hex: '#D97706',
    gradient: 'from-amber-600 via-yellow-700 to-orange-800',
    bgTint: 'rgba(217, 119, 6, 0.12)',
    darkBgTint: 'rgba(217, 119, 6, 0.2)',
    badgeBg: '#D97706',
    badgeText: '#FFFFFF',
    border: 'rgba(217, 119, 6, 0.4)',
    glow: 'rgba(217, 119, 6, 0.35)',
    Icon: Mountain,
  },
  flying: {
    hex: '#818CF8',
    gradient: 'from-indigo-300 via-sky-400 to-blue-500',
    bgTint: 'rgba(129, 140, 248, 0.12)',
    darkBgTint: 'rgba(129, 140, 248, 0.2)',
    badgeBg: '#818CF8',
    badgeText: '#FFFFFF',
    border: 'rgba(129, 140, 248, 0.4)',
    glow: 'rgba(129, 140, 248, 0.35)',
    Icon: Feather,
  },
  bug: {
    hex: '#65A30D',
    gradient: 'from-lime-500 via-emerald-600 to-green-700',
    bgTint: 'rgba(101, 163, 13, 0.12)',
    darkBgTint: 'rgba(101, 163, 13, 0.2)',
    badgeBg: '#65A30D',
    badgeText: '#FFFFFF',
    border: 'rgba(101, 163, 13, 0.4)',
    glow: 'rgba(101, 163, 13, 0.35)',
    Icon: Bug,
  },
  rock: {
    hex: '#B45309',
    gradient: 'from-amber-700 via-stone-700 to-yellow-900',
    bgTint: 'rgba(180, 83, 9, 0.12)',
    darkBgTint: 'rgba(180, 83, 9, 0.22)',
    badgeBg: '#B45309',
    badgeText: '#FFFFFF',
    border: 'rgba(180, 83, 9, 0.4)',
    glow: 'rgba(180, 83, 9, 0.35)',
    Icon: Box,
  },
  steel: {
    hex: '#64748B',
    gradient: 'from-slate-400 via-gray-500 to-zinc-600',
    bgTint: 'rgba(100, 116, 139, 0.12)',
    darkBgTint: 'rgba(100, 116, 139, 0.24)',
    badgeBg: '#64748B',
    badgeText: '#FFFFFF',
    border: 'rgba(100, 116, 139, 0.4)',
    glow: 'rgba(100, 116, 139, 0.35)',
    Icon: Shield,
  },
};

export function getTypeColor(type: string): TypeColorConfig {
  const normalized = type.toLowerCase() as PokemonType;
  return TYPE_COLORS[normalized] || TYPE_COLORS.normal;
}

export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`;
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
}
