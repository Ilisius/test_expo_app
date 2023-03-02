import { useEffect, useState } from "react";
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
  useEffect(() => {
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
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const searchPokemon = (search?: string) => {
    if (!search) {
      setDataPokemonDisplayed(dataAllPokemon);
      setSearch("");
      return;
    }
    setSearch(search);
    fetchPokemonsByName(search)
      .then((result: RawResult) => {
        const pokemon: Pokemon = pokemonAdapter(result);
        setDataPokemonDisplayed([pokemon]);
      })
      .catch((error) => {});
  };
  return { isLoading, dataPokemonDisplayed, searchPokemon, search };
};
