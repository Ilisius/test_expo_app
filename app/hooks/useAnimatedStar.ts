import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Pokemon } from "../components/Pokedex";
import { addFavorite, removeFavorite } from "../store/favoriteReducer";

export const useAnimatedStar = (props: { pokemon: Pokemon }) => {
  const favoritesPokemons = useSelector(
    (state: { favorite: Array<Pokemon> }) => state.favorite
  );
  const animValue: number = favoritesPokemons.some(
    (pkmn: Pokemon) => pkmn.name === props.pokemon.name
  )
    ? 1
    : 0;
  const [rotationAnim, setRotationAnim] = useState(
    new Animated.Value(animValue)
  );
  const [starColorAnim, setStarColorAnim] = useState(
    new Animated.Value(animValue)
  );
  const [sizeAnim, setSizeAnim] = useState(new Animated.Value(animValue));
  const dispatch = useDispatch();

  useEffect(() => {
    const b: number = favoritesPokemons.some(
      (pkmn: Pokemon) => pkmn.name === props.pokemon.name
    )
      ? 1
      : 0;
    setRotationAnim(new Animated.Value(b));
    setStarColorAnim(new Animated.Value(b));
    setSizeAnim(new Animated.Value(b));
  }, [animValue]);

  const handlePress = () => {
    const isFavorite = favoritesPokemons.some(
      (pkmn: Pokemon) => pkmn.name === props.pokemon.name
    );

    const anim = Animated.parallel([
      Animated.timing(rotationAnim, {
        toValue: !isFavorite ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(starColorAnim, {
        toValue: !isFavorite ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(sizeAnim, {
        toValue: !isFavorite ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      isFavorite
        ? dispatch(removeFavorite(props.pokemon))
        : dispatch(addFavorite(props.pokemon));
    });
  };

  const rotateStar = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  const changeColor = starColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#C0C0C0", "#FFD700"],
  });

  const sizeStar = sizeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 45],
  });

  return {
    handlePress,
    rotateStar,
    sizeStar,
    changeColor,
  };
};
