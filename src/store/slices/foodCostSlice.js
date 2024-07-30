import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setStorageItem, getStorageItem } from "../storageHelpers";
import { setErrorMessage } from "./appWrapperSlice"; // Import the error handling action from appWrapperSlice

// Define an async thunk for updating food cost data
export const updateFoodCostData = createAsyncThunk(
  "foodCost/updateFoodCostData",
  async (foodCostData, { rejectWithValue, dispatch }) => {
    try {
      // Attempt to save the food cost data to local storage
      setStorageItem("TheFoodItLastFoodCostCalc", foodCostData, null);
      // Return the food cost data to update the state
      return foodCostData;
    } catch (error) {
      // If an error occurs, dispatch an action to set an error message in appWrapperSlice
      dispatch(
        setErrorMessage(`Error setting food cost data: ${error.message}`)
      );
      // Reject the thunk with the error message for error handling
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for the food cost slice
const initialState = {
  userFoodCostData: getStorageItem("TheFoodItLastFoodCostCalc") || null, // Load initial data from storage
};

// Create a slice for food cost state management
const foodCostSlice = createSlice({
  name: "foodCost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fulfilled state of the updateFoodCostData thunk
    builder.addCase(updateFoodCostData.fulfilled, (state, action) => {
      state.userFoodCostData = action.payload; // Update the state with the new food cost data
    });
    // No need to manage errorMessage here as it's handled by appWrapperSlice
  },
});

// Export the reducer to be included in the store
export default foodCostSlice.reducer;
