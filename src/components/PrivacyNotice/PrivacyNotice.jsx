import styles from "./PrivacyNotice.module.css";

import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAcceptedPrivacy } from "../../store/slices/appWrapperSlice";

import Button from "../Button/Button";

function PrivacyNotice() {
  // redux
  const dispatch = useDispatch();
  const appWrapper = useSelector((store) => store.appWrapper);

  const navigate = useNavigate();
  const location = useLocation();

  function handleAccept() {
    dispatch(userAcceptedPrivacy());
    // redirect to the original intended location after accepting
    const redirectPath = location.state?.from?.pathname || "/";
    navigate(redirectPath);
  }
  // check if used accepted privacy or reading privacy policy
  if (
    appWrapper.isUserAcceptedPrivacy ||
    location.pathname === "/PrivacyPolicy"
  )
    return null;

  return (
    <div className={styles.privacyNoticeWrapper}>
      <div className={styles.privacyNotice}>
        {/* <div className={styles.privacyContent}>
          <p>
            We use local storage to save your preferences and personal
            information, and cookies for Google AdSense to serve personalized
            ads. By using our app, you agree to this data being stored and used.
            For details, please review our{" "}
            <Link className={styles.privacyLink} to="/PrivacyPolicy">
              Privacy Policy
            </Link>
            .
          </p>
        </div> */}
        <div className={styles.privacyContent}>
          <p>
            We use local storage to save your preferences and personal
            information. By using our app, you agree to this data being stored
            and used. For details, please review our{" "}
            <Link className={styles.privacyLink} to="/PrivacyPolicy">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <Button type={"cta"} onClick={handleAccept}>
          Accept
        </Button>
      </div>
    </div>
  );
}

export default PrivacyNotice;
