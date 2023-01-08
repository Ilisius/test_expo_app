import { fetchAllPokemons } from '../../app/request/PokedexRequest';

describe('test of PokedexService', () => {
    test('test fetching all pokemons', async () => {
        const limit = 100;
        const pokemons = await fetchAllPokemons(limit);
        expect(pokemons.results.length).toBe(limit);
    })
});