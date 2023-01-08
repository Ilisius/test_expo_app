//Needed for jest's test
import fetch from 'node-fetch';

const API_URL = 'https://pokeapi.co/api/v2/';

async function fetchAllPokemons(limit:number = 500) {
    return await fetch(`${API_URL}pokemon?limit=${limit}`)
        .then((response: { json: () => any; }) => response.json());
}

export { fetchAllPokemons };