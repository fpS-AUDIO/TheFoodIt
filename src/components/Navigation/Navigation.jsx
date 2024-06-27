import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
  const [isChecked, setIsChecked] = useState(false);

  function toggleCheckbox() {
    setIsChecked((value) => !value);
  }

  function handleNavLinkClick() {
    setIsChecked(false);
  }

  return (
    <div className={styles.navigation}>
      <input
        type="checkbox"
        checked={isChecked}
        className={styles.menuBtn}
        id="id-menu-btn"
        onChange={toggleCheckbox}
      />

      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <NavLink
            onClick={handleNavLinkClick}
            className={styles.navLink}
            to="/kcalCalculator"
          >
            kCalculator
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink
            onClick={handleNavLinkClick}
            className={styles.navLink}
            to="/converter"
          >
            converter
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink
            onClick={handleNavLinkClick}
            className={styles.navLink}
            to="/foodcost"
          >
            foodcost
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink
            onClick={handleNavLinkClick}
            className={styles.navLink}
            to="/about"
          >
            about
          </NavLink>
        </li>
      </ul>

      <label className={`noSelect ${styles.menuIcon}`} htmlFor="id-menu-btn">
        <span className={styles.navIcon}></span>
      </label>
    </div>
  );
}

export default Navigation;
