import styles from "./Disclairmer.module.css";

function Disclairmer({ title, message }) {
  return (
    <div className={styles.disclairmer}>
      <p className={styles.disclaimerTitle}>{title}</p>
      <p className={styles.disclaimerDescription}>{message}</p>
    </div>
  );
}

export default Disclairmer;
