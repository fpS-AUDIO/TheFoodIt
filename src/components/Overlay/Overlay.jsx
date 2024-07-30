import styles from "./Overlay.module.css";

import { useDispatch } from "react-redux";
import { closeMenu } from "../../store/slices/navigationSlice";

function Overlay() {
  const dispatch = useDispatch();

  function handleClickOnOverlay() {
    dispatch(closeMenu());
  }

  return (
    <div onClick={handleClickOnOverlay} className={styles.overlay}>
      &nbsp;
    </div>
  );
}

export default Overlay;
