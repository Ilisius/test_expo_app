import { Pokedex } from "../../app/components/Pokedex";
import { usePokedex } from "../../app/hooks/usePokedex";
import { fetchAllPokemons } from "../../app/request/PokedexRequest";
import fetch from "node-fetch";
jest.mock("node-fetch", () => jest.fn());
import { act, renderHook } from "@testing-library/react";

const mockApiRes = {
  abilities: [],
  base_experience: 0,
  forms: [],
  game_indices: [],
  height: 0,
  held_items: [],
  id: 0,
  is_default: true,
  location_area_encounters: "testMocked",
  moves: [],
  name: "testMocked",
  order: 0,
  past_types: [],
  species: {},
  sprites: {},
  stats: [],
  types: [],
  weight: 0,
};

const mockApiResAllPokemons = {
  count: 1279,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/",
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/",
    },
    {
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/",
    },
    {
      name: "squirtle",
      url: "https://pokeapi.co/api/v2/pokemon/7/",
    },
    {
      name: "wartortle",
      url: "https://pokeapi.co/api/v2/pokemon/8/",
    },
    {
      name: "blastoise",
      url: "https://pokeapi.co/api/v2/pokemon/9/",
    },
    {
      name: "caterpie",
      url: "https://pokeapi.co/api/v2/pokemon/10/",
    },
    {
      name: "metapod",
      url: "https://pokeapi.co/api/v2/pokemon/11/",
    },
    {
      name: "butterfree",
      url: "https://pokeapi.co/api/v2/pokemon/12/",
    },
    {
      name: "weedle",
      url: "https://pokeapi.co/api/v2/pokemon/13/",
    },
    {
      name: "kakuna",
      url: "https://pokeapi.co/api/v2/pokemon/14/",
    },
    {
      name: "beedrill",
      url: "https://pokeapi.co/api/v2/pokemon/15/",
    },
    {
      name: "pidgey",
      url: "https://pokeapi.co/api/v2/pokemon/16/",
    },
    {
      name: "pidgeotto",
      url: "https://pokeapi.co/api/v2/pokemon/17/",
    },
    {
      name: "pidgeot",
      url: "https://pokeapi.co/api/v2/pokemon/18/",
    },
    {
      name: "rattata",
      url: "https://pokeapi.co/api/v2/pokemon/19/",
    },
    {
      name: "raticate",
      url: "https://pokeapi.co/api/v2/pokemon/20/",
    },
  ],
};

describe("test of PokedexService", () => {
  test("test fetching all pokemons", async () => {
    (fetch as unknown as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockApiResAllPokemons),
      })
    );
    const limit = 20;
    const pokemons = await fetchAllPokemons(limit);
    expect(pokemons.results.length).toBe(limit);
  });

  test("test fetching pokemon by name", async () => {
    (fetch as unknown as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockApiRes),
      })
    );
    const { result } = renderHook(() => usePokedex());
    await act(async () => {
      await result.current.searchPokemon("testMocked");
    });
    expect(result.current.dataPokemonDisplayed[0]).toStrictEqual({
      name: "testMocked",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/testMocked",
    });
  });
});
