import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedStar from './AnimatedStar';

interface Pokemon {
    name : string;
    apiUrl : string;
}

const Favorites = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Array<Pokemon>>([]);
    const favoritesPokemons = useSelector((state : {favorite : Array<Pokemon>}) => state.favorite);
    useEffect(() => {
        setData(favoritesPokemons);
        setLoading(false);
    });
    return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            {isLoading ? <Text>Loading Pokedex...</Text> :
                data.map(pokemon => {
                    return (
                        <View key={pokemon.apiUrl} style={styles.pokemonItem}>
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


export default Favorites;