import { NavLink } from "react-router-dom";
import styles from "./KcalNavigation.module.css";

function KcalNavigation() {
  return (
    <nav className={`noSelect ${styles.kcalNav}`}>
      <ul>
        <li>
          <NavLink to="/kcalCalculator/stats">stats</NavLink>
        </li>
        <li>
          <NavLink to="/kcalCalculator/calculator">calculator</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default KcalNavigation;
