import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pokemon } from "../components/Pokedex";

export const useFavorites = () => {
  const [isLoading, setLoading] = useState(true);
  const [dataPokemon, setDataPokemon] = useState<Array<Pokemon>>([]);
  const favoritesPokemons = useSelector(
    (state: { favorite: Array<Pokemon> }) => state.favorite
  );
  useEffect(() => {
    setDataPokemon(favoritesPokemons);
    setLoading(false);
  });

  return { isLoading, dataPokemon };
};
