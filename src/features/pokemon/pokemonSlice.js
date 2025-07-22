import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllPokemon } from './pokemonAPI';

export const loadPokemon = createAsyncThunk('pokemon/load', async () => {
  return await fetchAllPokemon();
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],
    status: 'idle',
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(loadPokemon.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { toggleFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;
