import { createContext, useContext, useReducer } from "react";

// creating context
const MainContext = createContext();

const initialState = {
  isDesktop: window.innerWidth >= 900,
  isMenuOpened: false,
};

// the reduce function is called automatically by dispatch of useReducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_IS_DESKTOP":
      return { ...state, isDesktop: action.payload, isMenuOpened: false };

    case "TOGGLE_MENU":
      return { ...state, isMenuOpened: !state.isMenuOpened };

    case "MENU_CLOSED":
      return { ...state, isMenuOpened: false };

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
  const { isDesktop, isMenuOpened } = state;

  return (
    <MainContext.Provider value={{ dispatch, isDesktop, isMenuOpened }}>
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
