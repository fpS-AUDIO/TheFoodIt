// import { useEffect } from "react";
import styles from "./AppWrapper.module.css";
import { Outlet, useNavigation } from "react-router-dom";

import PrivacyNotice from "../PrivacyNotice/PrivacyNotice";
import Navbar from "../Navbar/Navbar";
import Spinner from "../Spinner/Spinner";

function AppWrapper() {
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

export default AppWrapper;
