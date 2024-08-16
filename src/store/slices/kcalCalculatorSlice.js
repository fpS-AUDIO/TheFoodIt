import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setStorageItem, getStorageItem } from "../storageHelpers";
import { setErrorMessage } from "./appLayoutSlice"; // Import the error handling action from appWrapperSlice

// Helper function to determine if a value is non-null and defined
function getBooleanValue(value) {
  return value !== null && value !== undefined;
}

// Define an async thunk for setting user kcal data
export const setUserKcalData = createAsyncThunk(
  "kcalCalculator/setUserKcalData",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      // Attempt to save the user data to local storage
      setStorageItem("TheFoodItUserKcalData", userData, null);
      // Return the user data to update the state
      return userData;
    } catch (error) {
      // If an error occurs, dispatch an action to set an error message in appWrapperSlice
      dispatch(setErrorMessage(`Error setting kcal data: ${error.message}`));
      // Reject the thunk with the error message for error handling
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for the kcal calculator slice
const initialState = {
  isUserKcalFormDataLoaded: getBooleanValue(
    getStorageItem("TheFoodItUserKcalData")
  ), // Check if the kcal data is loaded from storage
  userKcalFormData: getStorageItem("TheFoodItUserKcalData") || {
    gender: "",
    height: "",
    weight: "",
    age: "",
    pal: "",
    goal: "",
  }, // Default user kcal data
};

// Create a slice for kcal calculator state management
const kcalCalculatorSlice = createSlice({
  name: "kcalCalculator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fulfilled state of the setUserKcalData thunk
    builder.addCase(setUserKcalData.fulfilled, (state, action) => {
      state.userKcalFormData = action.payload; // Update the state with the new user data
      state.isUserKcalFormDataLoaded = true; // Mark the data as loaded
    });
    // No need to manage errorMessage here as it's handled by appWrapperSlice
  },
});

export default kcalCalculatorSlice.reducer;
