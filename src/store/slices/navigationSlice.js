import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  isMenuOpened: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isMenuOpened = !state.isMenuOpened;
      // if menu opens immediatlu remove all toasts
      if (state.isMenuOpened) toast.remove();
    },

    closeMenu(state) {
      state.isMenuOpened = false;
    },
  },
});

export const { toggleMenu, closeMenu } = navigationSlice.actions;

export default navigationSlice.reducer;
