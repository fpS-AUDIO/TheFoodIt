import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Homepage.module.css";
import Button from "../../components/Button/Button";
import videoSrc from "../../assets/video-soia-cooked.mp4"; // Import the video correctly

function Homepage() {
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
    navigate("/kcalCalculator");
  }

  return (
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
          Accurately calculates your daily caloric and nutritional needs, and
          helps you manage food costs effortlessly.
        </p>
        <Button onClick={handleClickButton} type={"cta"}>
          Calculate Your Nutritional Needs
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
