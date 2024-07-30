import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpened: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isMenuOpened = !state.isMenuOpened;
    },

    closeMenu(state) {
      state.isMenuOpened = false;
    },
  },
});

export const { toggleMenu, closeMenu } = navigationSlice.actions;

export default navigationSlice.reducer;
