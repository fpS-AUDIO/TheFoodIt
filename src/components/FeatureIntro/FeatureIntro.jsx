import styles from "./FeatureIntro.module.css";
function FeatureIntro({ children }) {
  return (
    <div className={styles.intro}>
      <h4>{children}</h4>
      <hr className={styles.hrLine} />
    </div>
  );
}

export default FeatureIntro;
