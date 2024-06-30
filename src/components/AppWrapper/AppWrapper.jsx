// import { useEffect } from "react";
import styles from "./AppWrapper.module.css";
// import { useMainContext } from "../../contexts/MainContext";

function AppWrapper({ children }) {
  // custom hook to get access to the global state
  // const { dispatch } = useMainContext();

  // useEffect(
  //   function () {
  //     // try to get boolean value if user accepted privacy from local storage
  //     const isUserAcceptedPrivacy =
  //       localStorage.getItem("TheFoodItUserAcceptedPrivacy") === "true";

  //     // if user accepted update the state
  //     if (isUserAcceptedPrivacy) dispatch({ type: "USER_ACCEPTED_PRIVACY" });
  //   },
  //   [dispatch]
  // );

  return <div className={styles.wrapper}>{children}</div>;
}

export default AppWrapper;
