import styles from "./Navigation.module.css";

// React Environment
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// REDUX: importing action creators
import { toggleMenu, closeMenu } from "../../store/slices/navigationSlice";
import { setIsDesktop } from "../../store/slices/appLayoutSlice";

// components
import Logo from "../Logo/Logo";

// React icons
// ICONS USED: https://react-icons.github.io/react-icons/icons/hi/
import {
  HiOutlineHome,
  HiOutlineChartPie,
  HiOutlineCalculator,
  HiOutlineScale,
  HiOutlineSwitchHorizontal,
  HiOutlineSearch,
  HiOutlineInformationCircle,
} from "react-icons/hi";

function Navigation() {
  // redux
  // const { appWrapper, navigation } = useSelector((reduxStore) => reduxStore);
  const appLayout = useSelector((state) => state.appLayout);
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
        <Logo />

        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <NavLink
              onClick={handleNavLinkClick}
              className={styles.navLink}
              to="/"
            >
              <HiOutlineHome />
              <span>Homepage</span>
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              onClick={handleNavLinkClick}
              className={styles.navLink}
              to="/foodcost"
            >
              <HiOutlineChartPie />
              <span>Food Cost</span>
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              onClick={handleNavLinkClick}
              className={styles.navLink}
              to="/kcalCalculator"
            >
              <HiOutlineCalculator />
              <span>kCalculator</span>
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              onClick={handleNavLinkClick}
              className={styles.navLink}
              to="/recipescaler"
            >
              <HiOutlineScale />
              <span>Recipe Scaler</span>
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              onClick={handleNavLinkClick}
              className={styles.navLink}
              to="/unitconverter"
            >
              <HiOutlineSwitchHorizontal />
              <span>UNIT CONVERTER</span>
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              onClick={handleNavLinkClick}
              className={styles.navLink}
              to="/nutritionfinder"
            >
              <HiOutlineSearch />
              <span>Nutrition Finder</span>
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              onClick={handleNavLinkClick}
              className={styles.navLink}
              to="/about"
            >
              <HiOutlineInformationCircle />
              <span>about</span>
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
