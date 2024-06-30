import { useEffect, useState } from "react";
import styles from "./KcalStats.module.css";
import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
  calculateMacronutrientDistribution,
} from "./calculateHelpers";
import { useMainContext } from "../../contexts/MainContext";

function KcalStats() {
  const { isUserKcalFormDataLoaded, userKcalFormData } = useMainContext();

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
  useEffect(
    function () {
      function updateStats(dataStats) {
        const bmi = calculateBMI(dataStats);
        const bmr = calculateBMR(dataStats);
        const { tdee, tdeeWithTEF } = calculateTDEE(bmr, dataStats.pal);
        const macronutrientDistribution = calculateMacronutrientDistribution(
          dataStats,
          tdeeWithTEF
        );

        // updating local state
        setStatsResults((stats) => ({
          ...stats,
          bmi,
          bmr,
          tdee,
          tdeeWithTEF,
          macronutrientsDistribution: macronutrientDistribution,
        }));
      }

      updateStats(userKcalFormData);
    },
    [userKcalFormData]
  );

  if (!isUserKcalFormDataLoaded)
    return (
      <div className={styles.statsContainer}>
        <p className={styles.initialMessage}>
          To view your personalized statistics, please complete and submit the
          calculator form. 😊
        </p>
      </div>
    );

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.subTitle}>Personal Stats</h2>

      <div className={styles.subContainer}>
        <div className={styles.statsRow}>
          <p className={styles.label}>Gender: </p>
          <p>{userKcalFormData.gender}</p>
        </div>

        <div className={styles.statsRow}>
          <p className={styles.label}>Age: </p>
          <p>{userKcalFormData.age} y.o.</p>
        </div>

        <div className={styles.statsRow}>
          <p className={styles.label}>Height: </p>
          <p>{userKcalFormData.height} cm</p>
        </div>

        <div className={styles.statsRow}>
          <p className={styles.label}>Weight: </p>
          <p>{userKcalFormData.weight} kg</p>
        </div>

        <div className={styles.statsRow}>
          <p className={styles.label}>Activity Multiplier: </p>
          <p>{userKcalFormData.pal}</p>
        </div>

        <div className={styles.statsRow}>
          <p className={styles.label}>Goal: </p>
          <p>{userKcalFormData.goal}</p>
        </div>
      </div>

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
          <p>{statsResults.bmr}</p>
        </div>

        <div className={styles.statsRow}>
          <p className={styles.label}>TDEE: </p>
          <p>
            {statsResults.tdee !== null
              ? statsResults.tdee.toFixed(2)
              : "Calculating..."}
          </p>
        </div>

        <div className={styles.statsRow}>
          <p className={styles.label}>TDEE with TEF:</p>
          <p>
            {statsResults.tdeeWithTEF !== null
              ? statsResults.tdeeWithTEF.toFixed(2)
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
    </div>
  );
}

export default KcalStats;
