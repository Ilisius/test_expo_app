import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchAllPokemons } from '../request/PokedexRequest';
import AnimatedStar from './AnimatedStar'

export interface Pokemon {
    name : string;
    apiUrl : string;
}


const Pokedex = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Array<Pokemon>>([]);
    useEffect(() => {
        fetchAllPokemons()
            .then((result : {count : number, next : string, previous : string, results : Array<{name : string, url : string}>}) => {
              const pokemons : Array<Pokemon> = result.results.map((apiRes) => {
                const pokemon : Pokemon = {name : apiRes.name, apiUrl : apiRes.url};
                return pokemon;
              });
              setData(pokemons);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            {isLoading ? <Text>Loading Pokedex...</Text> :
                data.map(pokemon => {
                    return (
                        <View key={pokemon.name} style={styles.pokemonItem}>
                            <Text style={styles.pokemonText} >{pokemon.name}</Text>
                            <AnimatedStar pokemon={pokemon}/>
                        </View>)
                })
            }
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
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

export default Pokedex;