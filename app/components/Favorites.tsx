import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';

interface Pokemon {
    name : string;
    apiUrl : string;
}

const Favorites = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Array<Pokemon>>([]);
    return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            {isLoading ? <Text>Not yet implemented...</Text> :
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

export default Favorites;