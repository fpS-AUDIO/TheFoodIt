import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserSubmittedRecipeScaler: false,
  updatedRecipeScalerIngredients: [],
  recipeScalerTotPortions: 0,
};

const recipeScalerSlice = createSlice({
  name: `recipeScaler`,
  initialState,
  reducers: {
    setIsUserSubmittedRecipeScaler(state, action) {
      state.isUserSubmittedRecipeScaler = action.payload;
    },
    updateRecipeScalerIngredients(state, action) {
      state.updatedRecipeScalerIngredients = action.payload;
    },

    updateRecipeScalerTotPortions(state, action) {
      state.recipeScalerTotPortions = action.payload;
    },
  },
});

export const {
  setIsUserSubmittedRecipeScaler,
  updateRecipeScalerIngredients,
  updateRecipeScalerTotPortions,
} = recipeScalerSlice.actions;

export default recipeScalerSlice.reducer;
