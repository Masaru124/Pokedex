export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export const ALL_POKEMON_TYPES: PokemonType[] = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

export interface PokemonStat {
  name: string;
  displayName: string;
  value: number;
  max: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonCardViewModel {
  id: number;
  name: string;
  formattedId: string;
  types: PokemonType[];
  artwork: string;
  shinyArtwork: string;
  sprite: string;
  shinySprite: string;
  cryAudioUrl: string;
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpAtk: number;
  baseSpDef: number;
  baseSpeed: number;
}

export interface PokemonDetailViewModel extends PokemonCardViewModel {
  heightMeters: number;
  heightFeet: string;
  weightKg: number;
  weightLbs: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: string[];
}

export type SortOption =
  | 'id-asc'
  | 'id-desc'
  | 'name-asc'
  | 'attack-desc'
  | 'defense-desc'
  | 'speed-desc'
  | 'hp-desc';

export interface RawPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface RawTypeResponse {
  id: number;
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

export interface RawPokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  cries?: {
    latest?: string;
    legacy?: string;
  };
  sprites: {
    front_default: string;
    front_shiny: string;
    other?: {
      'official-artwork'?: {
        front_default?: string;
        front_shiny?: string;
      };
      dream_world?: {
        front_default?: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}
