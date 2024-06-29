import styles from "./KcalCalculator.module.css";

import { useMainContext } from "../../contexts/MainContext";

import Footer from "../../components/Footer/Footer";
import KcalCalculatorForm from "../../components/KcalCalculatorForm/KcalCalculatorForm";
import KcalAccordian from "../../components/KcalAccordian/KcalAccordian";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function KcalCalculator() {
  const { errorMessage } = useMainContext();
  return (
    <div className={styles.wrapper}>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : ""}
      <div className={styles.content}>
        <KcalCalculatorForm />
        <KcalAccordian />
      </div>
      <Footer />
    </div>
  );
}

export default KcalCalculator;
