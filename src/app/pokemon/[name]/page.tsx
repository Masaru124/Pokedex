'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { PokemonModal } from '@/components/PokemonModal';
import { useFavorites } from '@/hooks/useFavorites';
import { ArrowLeft } from 'lucide-react';

interface PokemonPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function PokemonDetailPage({ params }: PokemonPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={handleClose}
        className="mb-4 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-sm flex items-center gap-2 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Explorer
      </button>

      <PokemonModal
        pokemonName={resolvedParams.name}
        onClose={handleClose}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
