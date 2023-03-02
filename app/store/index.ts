import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice } from "./favoriteReducer";

export const store = configureStore({
    reducer: {
        favorite: favoriteSlice.reducer,
    },
});