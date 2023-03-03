import { useCallback, useEffect, useState } from "react";
import { pokemonAdapter, RawResult } from "../adapters/pokemonAdapter";
import { Pokemon } from "../components/Pokedex";
import {
  fetchAllPokemons,
  fetchPokemonsByName,
} from "../request/PokedexRequest";

export const usePokedex = () => {
  const [isLoading, setLoading] = useState(true);
  const [dataAllPokemon, setDataAllPokemon] = useState<Array<Pokemon>>([]);
  const [dataPokemonDisplayed, setDataPokemonDisplayed] = useState<
    Array<Pokemon>
  >([]);
  const [search, setSearch] = useState("");

  const getAllPokemons = useCallback(() => {
    fetchAllPokemons()
      .then(
        (result: {
          count: number;
          next: string;
          previous: string;
          results: Array<{ name: string; url: string }>;
        }) => {
          const pokemons: Array<Pokemon> = result.results.map((apiRes) => {
            const pokemon: Pokemon = {
              name: apiRes.name,
              apiUrl: apiRes.url,
            };
            return pokemon;
          });
          setDataAllPokemon(pokemons);
          setDataPokemonDisplayed(pokemons);
        }
      )
      .catch((error) => {})
      .finally(() => setLoading(false));
  }, [fetchAllPokemons]);

  const searchPokemon = async (search?: string) => {
    if (!search) {
      setDataPokemonDisplayed(dataAllPokemon);
      setSearch("");
      return;
    }
    setSearch(search);
    try {
      const result = await fetchPokemonsByName(search);
      const pokemon: Pokemon = pokemonAdapter(result);
      setDataPokemonDisplayed([pokemon]);
    } catch {}
  };
  return {
    isLoading,
    dataPokemonDisplayed,
    searchPokemon,
    getAllPokemons,
    search,
  };
};
