import { useNavigate, useLocation } from "react-router-dom";
import { useMainContext } from "../../contexts/MainContext";
import styles from "./PrivacyNotice.module.css";
import Button from "../Button/Button";

function PrivacyNotice() {
  const { dispatch, isUserAcceptedPrivacy } = useMainContext();
  const navigate = useNavigate();
  const location = useLocation();

  function handleAccept() {
    dispatch({
      type: "USER_ACCEPTED_PRIVACY",
      errorHandler: dispatch,
    });
    // redirect to the original intended location after accepting
    const redirectPath = location.state?.from?.pathname || "/";
    navigate(redirectPath);
  }

  if (isUserAcceptedPrivacy) return null;

  return (
    <div className={styles.privacyNoticeWrapper}>
      <div className={styles.privacyNotice}>
        <div className={styles.privacyContent}>
          <p>
            We use local storage to improve your experience. By using our app,
            you consent to us storing your preferences, settings, and personal
            data (such as gender, height, weight, age, physical activity level,
            and fitness goals) in local storage to enhance your user experience.
            {/* <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a> */}
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
