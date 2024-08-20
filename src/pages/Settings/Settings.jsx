import styles from "./Settings.module.css";

// components
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import SettingRow from "../../features/Settings/SettingRow/SettingRow";

function Settings() {
  return (
    <div className={styles.settingsBox}>
      <ButtonBack />
      <div className={styles.mainSettings}>
        <SettingRow settingName="Light Mode:" />
      </div>
    </div>
  );
}

export default Settings;
