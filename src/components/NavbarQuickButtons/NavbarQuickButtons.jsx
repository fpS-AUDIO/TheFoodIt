import styles from "./NavbarQuickButtons.module.css";

// React
import { NavLink } from "react-router-dom";

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

function NavbarQuickButtons() {
  return (
    <ul className={styles.navLinks}>
      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/">
          <HiOutlineHome />
          <span className={styles.tooltip}>Home</span>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/foodcost">
          <HiOutlineChartPie />
          <span className={styles.tooltip}>Food Cost</span>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/kcalCalculator">
          <HiOutlineCalculator />
          <span className={styles.tooltip}>Kcal Calculator</span>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/recipescaler">
          <HiOutlineScale />
          <span className={styles.tooltip}>Recipe Scaler</span>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/unitconverter">
          <HiOutlineSwitchHorizontal />
          <span className={styles.tooltip}>Unit Converter</span>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/nutritionfinder">
          <HiOutlineSearch />
          <span className={styles.tooltip}>Nutrition Finder</span>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/about">
          <HiOutlineInformationCircle />
          <span className={styles.tooltip}>About</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default NavbarQuickButtons;
