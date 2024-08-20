import { useState } from "react";
import styles from "./Switcher.module.css";

function Switcher() {
  const [checked, setChecked] = useState(true);

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked((isChecked) => !isChecked)}
      />
      <span className={styles.slider}></span>
    </label>
  );
}

export default Switcher;
