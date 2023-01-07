
const API_URL = 'https://pokeapi.co/api/v2/';

export default class PokedexService {
    async fetchAllPokemons(limit=1000) {
        return fetch(`${API_URL}pokemon?limit=${limit}`)
        .then(response => response.json());
    }
}