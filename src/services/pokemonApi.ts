import {
  PokemonCardViewModel,
  PokemonDetailViewModel,
  PokemonType,
  RawPokemonDetail,
  RawPokemonListResponse,
  RawTypeResponse,
} from '@/types/pokemon';
import { capitalize, formatPokemonId } from '@/lib/typeColors';

const BASE_URL = 'https://pokeapi.co/api/v2';

export class ApiError extends Error {
  status?: number;
  isNotFound: boolean;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isNotFound = status === 404;
  }
}

async function fetchJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new ApiError(
        response.status === 404 ? 'Pokémon not found' : `Request failed with status ${response.status}`,
        response.status
      );
    }
    return (await response.json()) as T;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw error;
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Failed to connect to PokéAPI service');
  }
}

export function toCardViewModel(detail: RawPokemonDetail): PokemonCardViewModel {
  const artwork =
    detail.sprites.other?.['official-artwork']?.front_default ||
    detail.sprites.other?.dream_world?.front_default ||
    detail.sprites.front_default ||
    '';

  const shinyArtwork =
    detail.sprites.other?.['official-artwork']?.front_shiny ||
    detail.sprites.front_shiny ||
    artwork;

  const cryAudioUrl =
    detail.cries?.latest ||
    detail.cries?.legacy ||
    `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${detail.id}.ogg`;

  const types = detail.types.map((t) => t.type.name as PokemonType);

  const getStat = (statName: string) => {
    const found = detail.stats.find((s) => s.stat.name === statName);
    return found ? found.base_stat : 0;
  };

  return {
    id: detail.id,
    name: detail.name,
    formattedId: formatPokemonId(detail.id),
    types,
    artwork,
    shinyArtwork,
    sprite: detail.sprites.front_default || artwork,
    cryAudioUrl,
    baseHp: getStat('hp'),
    baseAttack: getStat('attack'),
    baseDefense: getStat('defense'),
    baseSpAtk: getStat('special-attack'),
    baseSpDef: getStat('special-defense'),
    baseSpeed: getStat('speed'),
  };
}

export function toDetailViewModel(detail: RawPokemonDetail): PokemonDetailViewModel {
  const cardModel = toCardViewModel(detail);

  const heightMeters = detail.height / 10;
  const totalInches = Math.round(heightMeters * 39.3701);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  const heightFeet = `${feet}' ${inches}"`;

  const weightKg = detail.weight / 10;
  const weightLbs = Math.round(weightKg * 2.20462 * 10) / 10;

  const abilities = detail.abilities.map((a) => ({
    name: capitalize(a.ability.name),
    isHidden: a.is_hidden,
  }));

  const statMap: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };

  const stats = detail.stats.map((s) => ({
    name: s.stat.name,
    displayName: statMap[s.stat.name] || capitalize(s.stat.name),
    value: s.base_stat,
    max: 255, // Max theoretical base stat in Pokémon
  }));

  const moves = detail.moves.map((m) => capitalize(m.move.name));

  return {
    ...cardModel,
    heightMeters,
    heightFeet,
    weightKg,
    weightLbs,
    abilities,
    stats,
    moves,
  };
}

// In-memory cache for full Pokémon index
let cachedIndex: { name: string; url: string }[] | null = null;

export async function fetchFullIndex(signal?: AbortSignal) {
  if (cachedIndex) return cachedIndex;
  const data = await fetchJSON<RawPokemonListResponse>(
    `${BASE_URL}/pokemon?limit=1300&offset=0`,
    signal
  );
  cachedIndex = data.results;
  return cachedIndex;
}

/**
 * Search Pokémon by partial string (e.g. "pika", "char", "mew") or ID number
 */
export async function searchPokemonPartial(
  query: string,
  offset: number = 0,
  limit: number = 20,
  signal?: AbortSignal
): Promise<{ items: PokemonCardViewModel[]; hasMore: boolean; total: number }> {
  const cleanQuery = query.trim().toLowerCase();

  // Direct numeric ID match e.g. "25"
  if (/^\d+$/.test(cleanQuery)) {
    try {
      const detail = await getPokemonDetail(cleanQuery, signal);
      return {
        items: [detail],
        hasMore: false,
        total: 1,
      };
    } catch (e) {
      // fallback to index search
    }
  }

  const index = await fetchFullIndex(signal);
  const matches = index.filter((p) => p.name.toLowerCase().includes(cleanQuery));

  if (matches.length === 0) {
    throw new ApiError(`No Pokémon found matching "${query}"`, 404);
  }

  const sliced = matches.slice(offset, offset + limit);
  const details = await Promise.all(
    sliced.map((p) => fetchJSON<RawPokemonDetail>(p.url, signal))
  );

  return {
    items: details.map(toCardViewModel),
    hasMore: offset + limit < matches.length,
    total: matches.length,
  };
}

export async function getEnrichedList(
  offset: number = 0,
  limit: number = 20,
  signal?: AbortSignal
): Promise<{ items: PokemonCardViewModel[]; hasMore: boolean; total: number }> {
  const data = await fetchJSON<RawPokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    signal
  );

  const details = await Promise.all(
    data.results.map((r) => fetchJSON<RawPokemonDetail>(r.url, signal))
  );

  return {
    items: details.map(toCardViewModel),
    hasMore: offset + limit < data.count,
    total: data.count,
  };
}

export async function getEnrichedListByType(
  type: string,
  offset: number = 0,
  limit: number = 20,
  signal?: AbortSignal
): Promise<{ items: PokemonCardViewModel[]; hasMore: boolean; total: number }> {
  const typeData = await fetchJSON<RawTypeResponse>(`${BASE_URL}/type/${type.toLowerCase()}`, signal);

  const allPokemon = typeData.pokemon.map((p) => p.pokemon);
  const sliced = allPokemon.slice(offset, offset + limit);

  const details = await Promise.all(
    sliced.map((p) => fetchJSON<RawPokemonDetail>(p.url, signal))
  );

  return {
    items: details.map(toCardViewModel),
    hasMore: offset + limit < allPokemon.length,
    total: allPokemon.length,
  };
}

export async function getPokemonDetail(
  nameOrId: string | number,
  signal?: AbortSignal
): Promise<PokemonDetailViewModel> {
  const cleanQuery = nameOrId.toString().trim().toLowerCase();
  const rawDetail = await fetchJSON<RawPokemonDetail>(`${BASE_URL}/pokemon/${cleanQuery}`, signal);
  return toDetailViewModel(rawDetail);
}
