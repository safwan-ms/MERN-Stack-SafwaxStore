import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      //Check if the product is not already favorite
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
  },
});
