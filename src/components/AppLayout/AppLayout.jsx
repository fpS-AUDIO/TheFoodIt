// import { useEffect } from "react";
import styles from "./AppLayout.module.css";
import { useEffect } from "react";

// React Router
import { Outlet, useNavigation } from "react-router-dom";

// Redux and Store
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage } from "../../store/slices/appLayoutSlice";

// Custom components
import PrivacyNotice from "../PrivacyNotice/PrivacyNotice";
import Navbar from "../Navbar/Navbar";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === `loading`;

  // store
  const appLayoutState = useSelector((store) => store.appLayout);
  const dispatch = useDispatch();

  // automatically remove error message and show toast
  useEffect(() => {
    const { errorMessage, secondsAutoRemoveError } = appLayoutState;

    if (errorMessage) {
      toast.error(errorMessage);

      const timer = setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000 * secondsAutoRemoveError);

      // Cleanup the timer if the component is unmounted before the timer ends
      return () => clearTimeout(timer);
    }
  }, [appLayoutState, dispatch]);

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
