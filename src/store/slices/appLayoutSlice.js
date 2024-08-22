import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setStorageItem, getStorageItem } from "../storageHelpers";

// Define an async thunk for handling user acceptance of privacy policy
export const userAcceptedPrivacy = createAsyncThunk(
  "appLayout/userAcceptedPrivacy",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Attempt to set a local storage item indicating user has accepted the privacy policy
      setStorageItem("TheFoodItUserAcceptedPrivacy", true, null);
      // Return a success value to indicate the operation completed successfully
      return true;
    } catch (error) {
      // If an error occurs, dispatch an action to set an error message in the state
      dispatch(
        setErrorMessage(`Error setting local storage: ${error.message}`)
      );
      // Return a rejected value with the error message to handle the error state
      return rejectWithValue(error.message);
    }
  }
);

// async thunk for handling to set in user's preference of theme (dark/light mode) in local storage / js object storage
export const saveUserPreferenceTheme = createAsyncThunk(
  "appLayout/saveUserPreferenceTheme",
  async (preferenceTheme, { rejectWithValue, dispatch }) => {
    try {
      setStorageItem("TheFoodItUserIsDarkMode", preferenceTheme, dispatch);
      return preferenceTheme;
    } catch (error) {
      dispatch(
        setErrorMessage(`Error saving theme preference: ${error.message}`)
      );
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isDesktop: window.innerWidth >= 1366,
  isUserAcceptedPrivacy:
    getStorageItem("TheFoodItUserAcceptedPrivacy") === true,
  errorMessage: "",
  secondsAutoRemoveError: 5,
  darkMode: getStorageItem("TheFoodItUserIsDarkMode") ?? true,
};

const appLayoutSlice = createSlice({
  name: "appLayout",
  initialState,
  reducers: {
    // Reducer to set the state indicating whether the app is on a desktop
    setIsDesktop(state, action) {
      state.isDesktop = action.payload;
    },
    // Reducer to set an error message in the state
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    // Reducer to clear the error message from the state
    clearErrorMessage(state) {
      state.errorMessage = "";
    },

    setDarkMode(state, action) {
      state.darkMode = action.payload;

      const theme = state.darkMode ? "dark" : "light";
      document.body.setAttribute("data-theme", theme);
    },
  },
  // Define extra reducers for handling actions outside the slice's basic reducers
  extraReducers: (builder) => {
    // Handle the fulfilled state of the userAcceptedPrivacy thunk
    builder.addCase(userAcceptedPrivacy.fulfilled, (state) => {
      state.isUserAcceptedPrivacy = true; // Mark the user as having accepted the privacy policy
    });
    // Handle the rejected state of the userAcceptedPrivacy thunk
    builder.addCase(userAcceptedPrivacy.rejected, (state, action) => {
      state.errorMessage = action.payload; // Set the error message if the thunk fails
    });

    builder.addCase(saveUserPreferenceTheme.fulfilled, (state, action) => {
      state.darkMode = action.payload; // Ensure the state is updated with the saved preference
    });
    builder.addCase(saveUserPreferenceTheme.rejected, (state, action) => {
      state.errorMessage = action.payload; // Handle any errors from the thunk
    });
  },
});

// named exports actions
export const { setIsDesktop, setErrorMessage, clearErrorMessage, setDarkMode } =
  appLayoutSlice.actions;

// default export for the reducer
export default appLayoutSlice.reducer;
