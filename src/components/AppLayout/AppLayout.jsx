// import { useEffect } from "react";
import styles from "./AppLayout.module.css";
import { Outlet, useNavigation } from "react-router-dom";

import PrivacyNotice from "../PrivacyNotice/PrivacyNotice";
import Navbar from "../Navbar/Navbar";
import Spinner from "../Spinner/Spinner";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === `loading`;

  return (
    <div className={styles.wrapper}>
      <Navbar />
      {isLoading && <Spinner />}
      <PrivacyNotice />

      <Outlet />
    </div>
  );
}

export default AppLayout;

// AppWrapper
