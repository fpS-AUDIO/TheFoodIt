import styles from "./PrivacyNotice.module.css";

import { useMainContext } from "../../contexts/MainContext";
import Button from "../Button/Button";

function PrivacyNotice() {
  const { dispatch, isUserAcceptedPrivacy } = useMainContext();

  function handleAccept() {
    dispatch({ type: "USER_ACCEPTED_PRIVACY" });
  }

  if (isUserAcceptedPrivacy) return;

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
