import styles from "./Overlay.module.css";
import { useMainContext } from "../../contexts/MainContext";

function Overlay() {
  const { dispatch } = useMainContext();

  function handleClickOnOverlay() {
    dispatch({ type: "MENU_CLOSED" });
  }

  return (
    <div onClick={handleClickOnOverlay} className={styles.overlay}>
      &nbsp;
    </div>
  );
}

export default Overlay;
