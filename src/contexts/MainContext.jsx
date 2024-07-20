import { createContext, useContext, useReducer } from "react";
import { setStorageItem, getStorageItem } from "./storageHelpers";

// helper function which returns boolean
function getBooleanValue(value) {
  return value !== null && value !== undefined;
}

// creating context
const MainContext = createContext();

const initialState = {
  isUserAcceptedPrivacy:
    getStorageItem("TheFoodItUserAcceptedPrivacy") === "true",
  // isDesktop: window.innerWidth >= 900,
  isDesktop: window.innerWidth >= 1366,
  isMenuOpened: false,
  errorMessage: "",
  isUserKcalFormDataLoaded: getBooleanValue(
    getStorageItem("TheFoodItUserKcalData")
  ),
  userKcalFormData: getStorageItem("TheFoodItUserKcalData") || {
    gender: "",
    height: "",
    weight: "",
    age: "",
    pal: "",
    goal: "",
  },
  isUserSubmittedRecipeScaler: false,
  updatedRecipeScalerIngredients: [],
  recipeScalerTotPortions: 0,
  userFoodCostData: getStorageItem("TheFoodItLastFoodCostCalc") || null,
};

// the reduce function is called automatically by dispatch of useReducer
function reducer(state, action) {
  switch (action.type) {
    case "RESET_STATE":
      return {
        ...initialState,
      };

    case "USER_ACCEPTED_PRIVACY":
      // also update the local storage
      setStorageItem(
        "TheFoodItUserAcceptedPrivacy",
        "true",
        action.errorHandler
      );
      return {
        ...state,
        isUserAcceptedPrivacy: true,
      };

    case "SET_IS_DESKTOP":
      return {
        ...state,
        isDesktop: action.payload,
        isMenuOpened: false,
      };

    case "TOGGLE_MENU":
      return {
        ...state,
        isMenuOpened: !state.isMenuOpened,
      };

    case "MENU_CLOSED":
      return {
        ...state,
        isMenuOpened: false,
      };

    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: "",
      };

    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload,
      };

    case "SET_USER_KCAL_FORM_DATA":
      setStorageItem(
        "TheFoodItUserKcalData",
        action.payload,
        action.errorHandler
      );

      return {
        ...state,
        userKcalFormData: action.payload,
        isUserKcalFormDataLoaded: true,
      };

    case "SET_IS_USER_SUBMITTED_RECIPESCALER":
      return {
        ...state,
        isUserSubmittedRecipeScaler: action.payload,
      };

    case "UPDATE_NEW_RECIPESCALER_INGREDIENTS":
      return {
        ...state,
        updatedRecipeScalerIngredients: action.payload,
      };

    case "UPDATE_RECIPESCALER_TOT_PORTIONS":
      return {
        ...state,
        recipeScalerTotPortions: action.payload,
      };

    case "UPDATE_USER_FOODCOST_DATA":
      setStorageItem(
        "TheFoodItLastFoodCostCalc",
        action.payload,
        action.errorHandler
      );
      return {
        ...state,
        userFoodCostData: action.payload,
      };

    default:
      throw new Error(
        `The reduce function (useReducer) didn't detect the action.type`
      );
  }
}

// custom component to provide the main context
function MainContextProvider({ children }) {
  // state is managed by useReducer (+ Context API)
  const [state, dispatch] = useReducer(reducer, initialState);

  // destructuring state
  const {
    isUserAcceptedPrivacy,
    isDesktop,
    isMenuOpened,
    errorMessage,
    isUserKcalFormDataLoaded,
    userKcalFormData,
    isUserSubmittedRecipeScaler,
    updatedRecipeScalerIngredients,
    recipeScalerTotPortions,
    userFoodCostData,
  } = state;

  return (
    <MainContext.Provider
      value={{
        dispatch,
        isUserAcceptedPrivacy,
        isDesktop,
        isMenuOpened,
        errorMessage,
        isUserKcalFormDataLoaded,
        userKcalFormData,
        isUserSubmittedRecipeScaler,
        updatedRecipeScalerIngredients,
        recipeScalerTotPortions,
        userFoodCostData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

// custom hook to get the context data (works like public API)
function useMainContext() {
  // get the value from context
  const mainContextData = useContext(MainContext);

  // guard clause: check if somebody tries to use it outside of context scope
  // I mean outside the MainContextProvider component wrapper
  if (mainContextData === undefined)
    throw new Error(
      `useMainContext is used outside of the MainContextProvider scope`
    );

  // retunr the actual data of the the MainContext
  return mainContextData;
}

export { MainContextProvider, useMainContext };
