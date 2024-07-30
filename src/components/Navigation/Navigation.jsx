import styles from "./Navigation.module.css";
import Logo from "../Logo/Logo";

import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// importing action creators
import { toggleMenu, closeMenu } from "../../store/slices/navigationSlice";
import { setIsDesktop } from "../../store/slices/appWrapperSlice";

function Navigation() {
  // redux
  // const { appWrapper, navigation } = useSelector((reduxStore) => reduxStore);
  const appWrapper = useSelector((state) => state.appWrapper);
  const navigation = useSelector((state) => state.navigation);
  const dispatch = useDispatch();

  // useEffect which event listener to change state if using desktop or mobile basing on media query
  useEffect(() => {
    // media query value should be the same as the global layout media query changes
    const mediaQuery = window.matchMedia("(min-width: 1366px)");

    // change desktop/mobile version (managed by useReducer)
    function handleMediaQueryChange(e) {
      // accepts boolean (event.boolean)
      dispatch(setIsDesktop(e.matches));
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup listener on component unmount to avoid memory leaks
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // toggle menu opened/closed (managed by useReducer)
  function toggleCheckbox() {
    dispatch(toggleMenu());
  }

  // close menu when a link is clicked
  function handleNavLinkClick() {
    dispatch(closeMenu());
  }

  return (
    <>
      <div
        className={`${styles.navigation} ${
          navigation.isMenuOpened ? "opened" : ""
        } `}
      >
        {!appWrapper.isDesktop ? <Logo /> : ""}

        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <NavLink
              onClick={handleNavLinkClick}
              className={styles.navLink}
              to="/foodcost"
            >
              Food Cost
            </NavLink>
          </li>

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
              to="/nutritionfinder"
            >
              Nutrition Finder
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
        checked={navigation.isMenuOpened}
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
