import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { clearErrorMessage } from "../../store/slices/appLayoutSlice";
import styles from "./ErrorMessage.module.css";

const SECS_AUTOREMOVE_ERROR = 5;

function ErrorMessage({ message }) {
  const dispatch = useDispatch();

  // automatically remove error message after given seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 1000 * SECS_AUTOREMOVE_ERROR);

    // Cleanup the timer if the component is unmounted before the timer ends
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className={styles.errorWrapper}>
      <p className={styles.warning}>⚠️</p>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
