import styles from "./RecipeScalerResults.module.css";

import { useMainContext } from "../../contexts/MainContext";
import Button from "../Button/Button";

function RecipeScalerResults() {
  const { dispatch, updatedRecipeScalerIngredients, recipeScalerTotPortions } =
    useMainContext();

  function handleRecalculate() {
    dispatch({ type: "UPDATE_RECIPESCALER_TOT_PORTIONS", payload: 0 });
    dispatch({ type: "UPDATE_NEW_RECIPESCALER_INGREDIENTS", payload: [] });
    dispatch({ type: "SET_IS_USER_SUBMITTED_RECIPESCALER", payload: false });
  }

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>
        Ingredients per {recipeScalerTotPortions} portions:
      </h2>
      {updatedRecipeScalerIngredients.map((ingredient, index) => (
        <div key={index} className={styles.resultsRow}>
          <p className={styles.pLabel}>{ingredient.name}</p>
          <p className={styles.pQuantity}>{ingredient.quantity}</p>
          <p className={styles.pUnit}>&nbsp;{ingredient.unit}</p>
        </div>
      ))}
      <div className={styles.btnBox}>
        <Button onClick={handleRecalculate} type="submitLarge">
          Recalculate Ingredients
        </Button>
      </div>
    </div>
  );
}

export default RecipeScalerResults;
