import { View, StyleSheet, Text } from "react-native";
import { AnimatedStar } from "./AnimatedStar";
import { Pokemon } from "./Pokedex";

export const PokemonItem = (props: { pokemon: Pokemon }) => {
  return (
    <View style={styles.pokemonItem}>
      <Text style={styles.pokemonText}>{props.pokemon.name}</Text>
      <AnimatedStar pokemon={props.pokemon} />
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 5,
    alignItems: "center",
  },
  pokemonText: {
    fontSize: 25,
  },
});
