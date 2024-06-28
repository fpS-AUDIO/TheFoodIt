import styles from "./AppWrapper.module.css";

import { useMainContext } from "../../contexts/MainContext";

import Overlay from "../Overlay/Overlay";
function AppWrapper({ children }) {
  const { isMenuOpened } = useMainContext();

  return (
    <div className={styles.wrapper}>
      {isMenuOpened ? <Overlay /> : ""}
      {children}
    </div>
  );
}

export default AppWrapper;
