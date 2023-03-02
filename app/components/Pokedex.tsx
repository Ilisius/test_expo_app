import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import { usePokedex } from "../hooks/usePokedex";
import { AnimatedStar } from "./AnimatedStar";
import { PokemonItem } from "./PokemonItem";
import { SearchBar } from "@rneui/themed";

export interface Pokemon {
  name: string;
  apiUrl: string;
}

export const Pokedex = () => {
  const { isLoading, dataPokemon } = usePokedex();
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar lightTheme />
      <ScrollView style={styles.scrollView}>
        {isLoading ? (
          <Text>Loading Pokedex...</Text>
        ) : (
          dataPokemon.map((pokemon) => {
            return <PokemonItem pokemon={pokemon} key={pokemon.apiUrl} />;
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
});
