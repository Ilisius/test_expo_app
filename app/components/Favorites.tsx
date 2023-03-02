import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import { useFavorites } from "../hooks/useFavorites";
import { AnimatedStar } from "./AnimatedStar";
import { PokemonItem } from "./PokemonItem";

export const Favorites = () => {
  const { isLoading, dataPokemon } = useFavorites();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {isLoading ? (
          <Text>Loading Pokedex...</Text>
        ) : (
          dataPokemon.map((pokemon) => {
            return <PokemonItem key={pokemon.apiUrl} pokemon={pokemon} />;
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
  },
  scrollView: {
    marginHorizontal: 20,
  },
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
