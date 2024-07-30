import { useEffect, useState } from "react";
import styles from "./KcalStats.module.css";
import Button from "../Button/Button";
import { generatePDF } from "./KcalStatsPdfHelper";
import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
  calculateMacronutrientDistribution,
} from "./calculateHelpers";

import { useSelector } from "react-redux";

function KcalStats() {
  const kcalCalculator = useSelector((store) => store.kcalCalculator);

  // calculating local state with helper function basing on global state
  const [statsResults, setStatsResults] = useState({
    bmi: null,
    bmr: null,
    tdee: null,
    tdeeWithTEF: null,
    macronutrientsDistribution: {
      carbs: null,
      proteins: null,
      fats: null,
    },
  });

  // effect to calculate the statsResults
  useEffect(() => {
    function updateStats(dataStats) {
      const bmi = calculateBMI(dataStats);
      const bmr = calculateBMR(dataStats);
      const { tdee, tdeeWithTEF } = calculateTDEE(
        bmr,
        dataStats.pal,
        dataStats.goal
      );
      const macronutrientDistribution = calculateMacronutrientDistribution(
        dataStats,
        tdeeWithTEF
      );

      setStatsResults({
        bmi,
        bmr,
        tdee,
        tdeeWithTEF,
        macronutrientsDistribution: macronutrientDistribution,
      });
    }

    if (kcalCalculator.isUserKcalFormDataLoaded) {
      updateStats(kcalCalculator.userKcalFormData);
    }
  }, [kcalCalculator.isUserKcalFormDataLoaded, kcalCalculator.userKcalFormData]);

  // path to logo file
  const logoPath = `${import.meta.env.VITE_PUBLIC_URL}TheFoodIt-logo.png`;
  // function to generate the pdf
  function handleGeneratePDF() {
    generatePDF(kcalCalculator.userKcalFormData, statsResults, logoPath);
  }

  if (!kcalCalculator.isUserKcalFormDataLoaded)
    return (
      <div className={styles.statsContainer}>
        <p className={styles.initialMessage}>
          To view your personalized statistics, please complete and submit the
          calculator form. 😊
        </p>
      </div>
    );

  return (
    <>
      <div className={styles.statsContainer}>
        <h2 className={styles.subTitle}>Personal Stats</h2>

        <div className={styles.subContainer}>
          <div className={styles.statsRow}>
            <p className={styles.label}>Gender: </p>
            <p>{kcalCalculator.userKcalFormData.gender}</p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>Age: </p>
            <p>{kcalCalculator.userKcalFormData.age} y.o.</p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>Height: </p>
            <p>{kcalCalculator.userKcalFormData.height} cm</p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>Weight: </p>
            <p>{kcalCalculator.userKcalFormData.weight} kg</p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>Activity Multiplier: </p>
            <p>{kcalCalculator.userKcalFormData.pal}</p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>Goal: </p>
            <p>{kcalCalculator.userKcalFormData.goal}</p>
          </div>
        </div>

        {kcalCalculator.userKcalFormData.goal === "weight" && (
          <div className={styles.notice}>
            <p>
              For weight loss, a caloric deficit of 500 kcal/day has been
              applied to your TDEE. Please consult with a healthcare provider
              for a personalized plan.
            </p>
          </div>
        )}

        <h2 className={styles.subTitle}>Kcal Stats</h2>

        <div className={styles.subContainer}>
          <div className={styles.statsRow}>
            <p className={styles.label}>BMI: </p>
            <p>
              {statsResults.bmi !== null
                ? statsResults.bmi.toFixed(2)
                : "Calculating..."}
            </p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>BMR: </p>
            <p>
              {statsResults.bmr !== null
                ? `${statsResults.bmr} kcal`
                : "Calculating..."}
            </p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>TDEE: </p>
            <p>
              {statsResults.tdee !== null
                ? `${statsResults.tdee.toFixed(2)} kcal`
                : "Calculating..."}
            </p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>TDEE with TEF:</p>
            <p>
              {statsResults.tdeeWithTEF !== null
                ? `${statsResults.tdeeWithTEF.toFixed(2)} kcal`
                : "Calculating..."}
            </p>
          </div>
        </div>

        <h2 className={styles.subTitle}>Macronutrient Distribution</h2>
        <div className={styles.subContainer}>
          <div className={styles.statsRow}>
            <p className={styles.label}>Carbs: </p>
            <p>{statsResults.macronutrientsDistribution.carbs}g</p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>Proteins: </p>
            <p>{statsResults.macronutrientsDistribution.proteins}g</p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>Fats: </p>
            <p>{statsResults.macronutrientsDistribution.fats}g</p>
          </div>
        </div>

        <div className={styles.btnBox}>
          <Button onClick={handleGeneratePDF} type="cta">
            Download PDF
          </Button>
        </div>
      </div>
    </>
  );
}

export default KcalStats;
