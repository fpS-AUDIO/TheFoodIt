import styles from "./Settings.module.css";

// Redux and Store
import { useDispatch, useSelector } from "react-redux";
import {
  saveUserPreferenceTheme,
  setDarkMode,
} from "../../store/slices/appLayoutSlice";

// components
import Switcher from "../../components/Switcher/Switcher";
import ButtonBack from "../../components/ButtonBack/ButtonBack";

function Settings() {
  const dispatch = useDispatch();
  const appLayout = useSelector((store) => store.appLayout);

  function handleThemeChange() {
    const newIsDark = !appLayout.darkMode;

    // update state
    dispatch(setDarkMode(newIsDark));

    // set to local storage
    dispatch(saveUserPreferenceTheme(newIsDark));
  }

  return (
    <div className={styles.settingsBox}>
      <ButtonBack />
      <div className={styles.mainSettings}>
        {/* DARK MODE */}
        <div className={styles.settingsRow}>
          <p className={styles.settingTitle}>Dark Mode</p>
          <Switcher isOn={appLayout.darkMode} onChange={handleThemeChange} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
