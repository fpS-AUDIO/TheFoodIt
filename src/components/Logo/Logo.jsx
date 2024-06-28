import { Link } from "react-router-dom";

import styles from "./Logo.module.css";

import { useMainContext } from "../../contexts/MainContext";

function Logo() {
  const { dispatch } = useMainContext();

  function handleCloseSidebar() {
    dispatch({ type: "MENU_CLOSED" });
  }

  return (
    <div className={`noSelect  ${styles.logobox}`}>
      <Link to="/">
        <img
          src="/TheFoodIt-logoLight.png"
          alt="TheFoodIt logo"
          className={styles.logo}
          onClick={handleCloseSidebar}
        />
      </Link>
    </div>
  );
}

export default Logo;
