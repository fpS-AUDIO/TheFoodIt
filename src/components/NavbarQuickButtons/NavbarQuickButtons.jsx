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
  HiOutlineCog,
  HiOutlineInformationCircle,
} from "react-icons/hi";

function NavbarQuickButtons() {
  return (
    <ul className={styles.navLinks}>
      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/">
          <abbr title="Home">
            <HiOutlineHome />
          </abbr>
          {/* <span className={styles.tooltip}>Home</span> */}
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/foodcost">
          <abbr title="Food Cost">
            <HiOutlineChartPie />
          </abbr>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/kcalCalculator">
          <abbr title="Kcal Calculator">
            <HiOutlineCalculator />
          </abbr>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/recipescaler">
          <abbr title="Recipe Scaler">
            <HiOutlineScale />
          </abbr>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/unitconverter">
          <abbr title="Unit Converter">
            <HiOutlineSwitchHorizontal />
          </abbr>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/nutritionfinder">
          <abbr title="Nutrition Finder">
            <HiOutlineSearch />
          </abbr>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/settings">
          <abbr title="Settings">
            <HiOutlineCog />
          </abbr>
        </NavLink>
      </li>

      <hr className={styles.verticalLine} />

      <li className={styles.navItem}>
        <NavLink className={styles.navLink} to="/about">
          <abbr title="About">
            <HiOutlineInformationCircle />
          </abbr>
        </NavLink>
      </li>
    </ul>
  );
}

export default NavbarQuickButtons;
