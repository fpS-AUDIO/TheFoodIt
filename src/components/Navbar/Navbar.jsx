import styles from "./Navbar.module.css";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <Navigation />
    </nav>
  );
}

export default Navbar;
