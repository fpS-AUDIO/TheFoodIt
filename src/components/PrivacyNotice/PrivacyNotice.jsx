import { useNavigate, useLocation, Link } from "react-router-dom";
import { useMainContext } from "../../contexts/MainContext";
import styles from "./PrivacyNotice.module.css";
import Button from "../Button/Button";

function PrivacyNotice() {
  const { dispatch, isUserAcceptedPrivacy } = useMainContext();
  const navigate = useNavigate();
  const location = useLocation();

  // function checks if privacy is accepted
  function handleAccept() {
    dispatch({
      type: "USER_ACCEPTED_PRIVACY",
      errorHandler: dispatch,
    });
    // redirect to the original intended location after accepting
    const redirectPath = location.state?.from?.pathname || "/";
    navigate(redirectPath);
  }
  // check if used accepted privacy or reading privacy policy
  if (isUserAcceptedPrivacy || location.pathname === "/PrivacyPolicy")
    return null;

  return (
    <div className={styles.privacyNoticeWrapper}>
      <div className={styles.privacyNotice}>
        <div className={styles.privacyContent}>
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
        </div>
        <Button type={"cta"} onClick={handleAccept}>
          Accept
        </Button>
      </div>
    </div>
  );
}

export default PrivacyNotice;
