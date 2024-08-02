import styles from "./KcalCalculator.module.css";
import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
// import Advertisement01 from "../../components/Advertisement01/Advertisement01";

// general components
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Footer from "../../components/Footer/Footer";
import Disclairmer from "../../components/Disclairmer/Disclairmer";
import FeatureIntro from "../../components/FeatureIntro/FeatureIntro";

// feature components
import KcalNavigation from "../../features/KcalCalculator/KcalNavigation/KcalNavigation";
import KcalAccordian from "../../features/KcalCalculator/KcalAccordian/KcalAccordian";

function KcalCalculator() {
  const appWrapper = useSelector((store) => store.appWrapper);

  return (
    <>
      {/* <Advertisement01 /> */}

      <div className={styles.wrapper}>
        <FeatureIntro>
          Receive a comprehensive analysis of your body metrics, including BMI,
          BMR, TDEE, TDEE with TEF, and a macronutrient distribution guide
          tailored to your fitness goals. Review personalized results to make
          informed decisions about your nutrition.
        </FeatureIntro>

        {appWrapper.errorMessage ? (
          <ErrorMessage message={appWrapper.errorMessage} />
        ) : (
          ""
        )}
        <KcalNavigation />
        <div className={styles.content}>
          {/* Outlet will be replaced with nested Route component */}
          <Outlet />
          <KcalAccordian />
        </div>
        <Footer>
          <Disclairmer
            // title={"Health Disclaimer for TheFoodIt"}
            message={`TheFoodIt's health metrics (BMI, BMR, TDEE) and suggested
      ratios of carbohydrates, proteins, and fats are general guides, not
      medical advice. Individual health varies, and the results provided
      are estimates and not guaranteed. Always consult a healthcare provider
      for personal advice, especially for weight loss goals. Use at your own risk.`}
          />
        </Footer>
      </div>
    </>
  );
}

export default KcalCalculator;
