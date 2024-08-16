import styles from "./Navbar.module.css";

// Redux and Store
import { useSelector } from "react-redux";

// Components
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Overlay from "../Overlay/Overlay";
import NavbarQuickButtons from "../NavbarQuickButtons/NavbarQuickButtons";

function Navbar() {
  const navigation = useSelector((store) => store.navigation);
  const appLayout = useSelector((store) => store.appLayout);

  return (
    <nav className={styles.nav}>
      <Logo />

      {navigation.isMenuOpened ? <Overlay /> : ""}

      {appLayout.isDesktop && <NavbarQuickButtons />}
      <Navigation />
    </nav>
  );
}

export default Navbar;
