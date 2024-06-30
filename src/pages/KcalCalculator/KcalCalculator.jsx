import styles from "./KcalCalculator.module.css";
import { Outlet } from "react-router-dom";

import { useMainContext } from "../../contexts/MainContext";

import KcalNavigation from "../../components/KcalNavigation/KcalNavigation";

import KcalAccordian from "../../components/KcalAccordian/KcalAccordian";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Footer from "../../components/Footer/Footer";

function KcalCalculator() {
  const { errorMessage } = useMainContext();

  return (
    <div className={styles.wrapper}>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : ""}
      <KcalNavigation />
      <div className={styles.content}>
        {/* Outlet will be replaced with nested Route component */}
        <Outlet />
        <KcalAccordian />
      </div>
      <Footer>
        <div className={styles.disclairmer}>
          <p className={styles.disclaimerTitle}>Health Disclaimer for TheFoodIt</p>
          <p className={styles.disclaimerDescription}>
            TheFoodIt&apos;s health metrics (BMI, BMR, TDEE) and suggested
            ratios of carbohydrates, proteins, and fats are general guides, not
            medical advice. Individual health varies. Always consult a
            healthcare provider for personal advice. Use at your own risk.
          </p>
        </div>
      </Footer>
    </div>
  );
}

export default KcalCalculator;
