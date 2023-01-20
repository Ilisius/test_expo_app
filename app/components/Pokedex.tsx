import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { fetchAllPokemons } from '../request/PokedexRequest';
import AnimatedStar from './AnimatedStar'

interface Pokemon {
    name : string;
    apiUrl : string;
}


const Pokedex = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Array<Pokemon>>([]);
    useEffect(() => {
        fetchAllPokemons()
            .then((result) => setData(result.results))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            {isLoading ? <Text>Loading Pokedex...</Text> :
                data.map(elem => {
                    console.log(elem);
                    return (
                        <View key={elem.name} style={styles.pokemonItem}>
                            <Text style={styles.pokemonText} >{elem.name}</Text>
                            <AnimatedStar/>
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