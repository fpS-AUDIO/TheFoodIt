import styles from "./NutritionFinderResultDetailed.module.css";
import { nutritionHeaders } from "../../../data/Headers_FNDDS_Nutrient_Values_2020";

function NutritionFinderResultDetailed({ dish }) {
  console.log(dish);
  return (
    <div className={styles.currentDishBox}>
      <div className={styles.dishIntro}>
        <p>{dish.field2}</p>
      </div>

      <div className={styles.mainData}>
        <p></p>
        <p></p>
      </div>

      <div className={styles.statsRow}>
        <p className={styles.label}>{nutritionHeaders.field5}: </p>
        <p>{dish.field5}</p>
      </div>

      <div className={styles.statsRow}>
        <p className={styles.label}>{nutritionHeaders.field7}: </p>
        <p>{dish.field7}</p>
      </div>

      <div className={styles.statsRow}>
        <p className={styles.label}>{nutritionHeaders.field8}: </p>
        <p>{dish.field8}</p>
      </div>

      <div className={styles.statsRow}>
        <p className={styles.label}>{nutritionHeaders.field6}: </p>
        <p>{dish.field6}</p>
      </div>

      <div className={styles.statsRow}>
        <p className={styles.label}>{nutritionHeaders.field10}: </p>
        <p>{dish.field10}</p>
      </div>
      <div className={styles.statsRow}>
        <p className={styles.label}>{nutritionHeaders.field11}: </p>
        <p>{dish.field11}</p>
      </div>
      <div className={styles.statsRow}>
        <p className={styles.label}>{nutritionHeaders.field12}: </p>
        <p>{dish.field12}</p>
      </div>
      <div className={styles.statsRow}>
        <p className={styles.label}>{nutritionHeaders.field13}: </p>
        <p>{dish.field13}</p>
      </div>
    </div>
  );
}

export default NutritionFinderResultDetailed;
