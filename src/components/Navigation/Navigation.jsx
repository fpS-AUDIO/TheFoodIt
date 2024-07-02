import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";

import { useMainContext } from "../../contexts/MainContext";
import Logo from "../Logo/Logo";

function Navigation() {
  // dispatch of useReducer function from custom hook context provider
  const { dispatch, isMenuOpened, isDesktop } = useMainContext();

  // previous version:
  // const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);

  // useEffect which event listener to change state if using desktop or mobile basing on media query
  useEffect(() => {
    // media query value should be the same as the global layout media query changes
    const mediaQuery = window.matchMedia("(min-width: 900px)");

    // change desktop/mobile version (managed by useReducer)
    function handleMediaQueryChange(e) {
      // accepts boolean (event.boolean)
      dispatch({ type: "SET_IS_DESKTOP", payload: e.matches });
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup listener on component unmount to avoid memory leaks
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [dispatch]);

  // toggle menu opened/closed (managed by useReducer)
  function toggleCheckbox() {
    dispatch({ type: "TOGGLE_MENU" });
  }

  // close menu when a link is clicked
  function handleNavLinkClick() {
    dispatch({ type: "MENU_CLOSED" });
  }

  return (
    <>
      <div className={`${styles.navigation} ${isMenuOpened ? "opened" : ""} `}>
        {!isDesktop ? <Logo /> : ""}

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
              to="/recipescaler"
            >
              Recipe Scaler
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              onClick={handleNavLinkClick}
              className={styles.navLink}
              to="/unitconverter"
            >
              UNIT CONVERTER
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
      </div>

      <input
        type="checkbox"
        checked={isMenuOpened}
        className={styles.menuBtn}
        id="id-menu-btn"
        onChange={toggleCheckbox}
      />
      <label className={`noSelect ${styles.menuIcon}`} htmlFor="id-menu-btn">
        <span className={styles.navIcon}></span>
      </label>
    </>
  );
}

export default Navigation;
