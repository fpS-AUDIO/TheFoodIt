import styles from "./Navbar.module.css";
import { useMainContext } from "../../contexts/MainContext";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Overlay from "../Overlay/Overlay";

function Navbar() {
  const { isMenuOpened } = useMainContext();
  return (
    <nav className={styles.nav}>
      <Logo />
      {isMenuOpened ? <Overlay /> : ""}
      <Navigation />
    </nav>
  );
}

export default Navbar;
