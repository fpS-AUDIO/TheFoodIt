import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
  return (
    <div className={styles.errorWrapper}>
      <p className={styles.warning}>⚠️</p>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
