import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { fetchAllPokemons } from '../request/PokedexRequest';
import { Path, Svg } from 'react-native-svg';

interface Pokemon {
    name : string;
    apiUrl : string;
}

const starPath = "M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z";

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
                        <View style={styles.pokemonItem}>
                            <Text style={styles.pokemonText} key={elem.name}>{elem.name}</Text>
                            <Svg height={40} width={40} viewBox='-5 -5 55 55'>
                                <Path d={starPath} stroke="black" strokeWidth={2} />
                            </Svg>
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