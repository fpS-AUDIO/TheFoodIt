import styles from "./AppWrapper.module.css";

function AppWrapper({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default AppWrapper;
