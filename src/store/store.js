import { configureStore } from "@reduxjs/toolkit";

// default imports of reducers
import appLayoutReducer from "./slices/appLayoutSlice";
import navigationReducer from "./slices/navigationSlice";
import foodCostReducer from "./slices/foodCostSlice";
import kcalCalculatorReducer from "./slices/kcalCalculatorSlice";
import recipeScalerReducer from "./slices/recipeScalerSlice";

/* ----- configureStore() automatically:
- combine the reducers
- add the Thunk middleware
- set up the developer tools
*/

// configureStore accepts object of options
// 'reducer' is the root reducer
// 'reducer' should be object which tells RTK about the reducers
const store = configureStore({
  reducer: {
    appLayout: appLayoutReducer,
    navigation: navigationReducer,
    foodCost: foodCostReducer,
    kcalCalculator: kcalCalculatorReducer,
    recipeScaler: recipeScalerReducer,
  },
});

export default store;
