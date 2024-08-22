import styles from "./Logo.module.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../store/slices/navigationSlice";

function Logo() {
  const dispatch = useDispatch();
  const appLayout = useSelector((store) => store.appLayout);
  const isDarkMode = appLayout.darkMode;

  function handleCloseSidebar() {
    dispatch(closeMenu());
  }

  return (
    <div className={`noSelect  ${styles.logobox}`}>
      <Link to="/">
        <img
          src={isDarkMode ? "/TheFoodIt-logoLight.png" : "/TheFoodIt-logo.png"}
          alt="TheFoodIt logo"
          className={styles.logo}
          onClick={handleCloseSidebar}
        />
      </Link>
    </div>
  );
}

export default Logo;
