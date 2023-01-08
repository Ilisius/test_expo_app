import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { fetchAllPokemons } from '../request/PokedexRequest';

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
                    return <Text key={elem.name}>{elem.name}</Text>
                })
            }
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'aliceblue',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default Pokedex;