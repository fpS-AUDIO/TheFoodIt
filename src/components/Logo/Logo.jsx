import styles from "./Logo.module.css";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../store/slices/navigationSlice";

function Logo() {
  const dispatch = useDispatch();

  function handleCloseSidebar() {
    dispatch(closeMenu());
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
