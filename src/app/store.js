import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/pokemon/favoriteSlice";
import pokemonReducer from "../features/pokemon/pokemonSlice";

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    pokemon: pokemonReducer,
  },
});
