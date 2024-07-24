import styles from "./NutritionFinderResultDetailed.module.css";
import { nutritionHeaders } from "../../../data/Headers_FNDDS_Nutrient_Values_2020";

function NutritionFinderResultDetailed({ dish }) {
  // console.log(dish);

  return (
    <div className={styles.currentDishBox}>
      <div className={styles.dishIntro}>
        <p>{dish.field2}</p>
      </div>

      {Object.keys(dish)
        .slice(4, 49)
        .map((key, index) => (
          <div key={index} className={styles.statsRow}>
            <p className={styles.label}>{nutritionHeaders[key]}: </p>
            <p>{dish[key]}</p>
          </div>
        ))}

      <div className={styles.statsRow}>
        <p className={styles.label}>{nutritionHeaders.field69}: </p>
        <p>{dish.field69}</p>
      </div>
    </div>
  );
}

export default NutritionFinderResultDetailed;
