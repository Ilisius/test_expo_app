import { useEffect, useState } from "react";
import { Pokemon } from "../components/Pokedex";
import { fetchAllPokemons } from "../request/PokedexRequest";

export const usePokedex = () => {
  const [isLoading, setLoading] = useState(true);
  const [dataPokemon, setDataPokemon] = useState<Array<Pokemon>>([]);
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
          setDataPokemon(pokemons);
        }
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return { isLoading, dataPokemon };
};
