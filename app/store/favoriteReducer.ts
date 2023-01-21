import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../components/Pokedex";

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState: Array<Pokemon>(),
    reducers: {
        addFavorite: (state, action : {type : string, payload : Pokemon}) => {
            const newFavorite = action.payload;
            state.push(newFavorite);
        },
        removeFavorite: (state, action : {type : string, payload : Pokemon}) => {
            return state.filter(fav => fav.name !== action.payload.name);
        },
    }
})

export const {addFavorite, removeFavorite} = favoriteSlice.actions;