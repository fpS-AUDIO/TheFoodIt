import styles from "./Switcher.module.css";

function Switcher({ isOn, onChange }) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isOn} onChange={onChange} />
      <span className={styles.slider}></span>
    </label>
  );
}

export default Switcher;
