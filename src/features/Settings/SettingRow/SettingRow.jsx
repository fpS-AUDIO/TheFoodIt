import styles from "./SettingRow.module.css";

// components
import Switcher from "../../../components/Switcher/Switcher";

function SettingRow({ settingName }) {
  return (
    <div className={styles.settingBox}>
      <p className={styles.settingTitle}>{settingName}</p>
      <Switcher />
    </div>
  );
}

export default SettingRow;
