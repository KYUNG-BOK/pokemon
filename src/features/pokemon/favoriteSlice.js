import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteIds: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },
    removeFromFavorite: (state, action) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export const selectFavoriteIds = (state) => state.favorite.favoriteIds;
export default favoriteSlice.reducer;