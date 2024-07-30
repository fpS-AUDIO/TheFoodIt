import styles from "./Navbar.module.css";

import { useSelector } from "react-redux";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Overlay from "../Overlay/Overlay";

function Navbar() {
  const navigation = useSelector((store) => store.navigation);

  return (
    <nav className={styles.nav}>
      <Logo />
      {navigation.isMenuOpened ? <Overlay /> : ""}
      <Navigation />
    </nav>
  );
}

export default Navbar;
