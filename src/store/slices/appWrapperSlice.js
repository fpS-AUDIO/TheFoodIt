import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setStorageItem, getStorageItem } from "../storageHelpers";

// Define an async thunk for handling user acceptance of privacy policy
export const userAcceptedPrivacy = createAsyncThunk(
  "appWrapper/userAcceptedPrivacy",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Attempt to set a local storage item indicating user has accepted the privacy policy
      setStorageItem("TheFoodItUserAcceptedPrivacy", "true", null);
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

const initialState = {
  isDesktop: window.innerWidth >= 1366,
  isUserAcceptedPrivacy:
    getStorageItem("TheFoodItUserAcceptedPrivacy") === "true",
  errorMessage: "",
};

const appWrapperSlice = createSlice({
  name: "appWrapper",
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
  },
});

// named exports actions
export const { setIsDesktop, setErrorMessage, clearErrorMessage } =
  appWrapperSlice.actions;

// default export for the reducer
export default appWrapperSlice.reducer;
