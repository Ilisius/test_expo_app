import { Pokemon } from "../components/Pokedex";

export interface RawResult {
  abilities: Object[];
  base_experience: number;
  forms: Object[];
  game_indices: Object[];
  height: number;
  held_items: Object[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Object[];
  name: string;
  order: number;
  past_types: Object[];
  species: Map<string, string>;
  sprites: Map<string, string>;
  stats: Object[];
  types: Object[];
  weight: number;
}

export const pokemonAdapter = (result: RawResult): Pokemon => {
  return {
    name: result.name,
    apiUrl: `https://pokeapi.co/api/v2/pokemon/${result.name}`,
  };
};
