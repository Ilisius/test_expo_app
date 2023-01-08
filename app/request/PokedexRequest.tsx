//Needed for jest's test
import fetch from 'node-fetch';

const API_URL = 'https://pokeapi.co/api/v2/';

//Set the limit to 100 because this is just a test app, we don't really need this much data
async function fetchAllPokemons(limit:number = 100) {
    return await fetch(`${API_URL}pokemon?limit=${limit}`)
        .then((response: { json: () => any; }) => response.json());
}

export { fetchAllPokemons };