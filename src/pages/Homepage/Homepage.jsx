// 3rd party libraries
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// styles
import styles from "./Homepage.module.css";

// contexts/state
import { useMainContext } from "../../contexts/MainContext";

// add files
import videoSrc from "../../assets/video-soia-cooked.mp4";

// components
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

function Homepage() {
  const { errorMessage } = useMainContext();

  // useNavigate just returns function to chnage route
  const navigate = useNavigate();

  // useRef to maintain the reference to video instance across renderings
  const videoRef = useRef(null);

  // effect to adjust the playback speed of the video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
  }, []);

  function handleClickButton() {
    navigate("/foodcost");
  }

  return (
    <>
      <div className={styles.homepage}>
        <div className={styles.bgVideo}>
          <video
            ref={videoRef}
            className={styles.bgVideoContent}
            autoPlay
            muted
            loop
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser doesn&apos;t support video
          </video>
          <div className={styles.homeOverlay}></div>
        </div>
        <div className={styles.content}>
          <h1 className={styles.heading1}>You Create the Meals.</h1>
          <h3 className={styles.heading3}>TheFoodIt Does the Math.</h3>
          <p className={styles.paragraph}>
            Discover the true cost of your culinary creations with our Food Cost
            Calculator.
          </p>
          <Button onClick={handleClickButton} type={"cta"}>
            Try the Food Cost Calculator Now
          </Button>
        </div>
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
