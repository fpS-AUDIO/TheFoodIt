import { Link } from "react-router-dom";

import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={`noSelect  ${styles.logobox}`}>
      <Link to="/">
        <img
          src="/TheFoodIt-logoLight.png"
          alt="TheFoodIt logo"
          className={styles.logo}
        />
      </Link>
    </div>
  );
}

export default Logo;
