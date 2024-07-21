import styles from "./RecipeScalerResults.module.css";
import { generatePDF } from "./RecipeScalerResultsPdfHelper";
import { useMainContext } from "../../contexts/MainContext";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import Disclairmer from "../Disclairmer/Disclairmer";

function RecipeScalerResults() {
  const { dispatch, updatedRecipeScalerIngredients, recipeScalerTotPortions } =
    useMainContext();

  function handleRecalculate() {
    dispatch({ type: "UPDATE_RECIPESCALER_TOT_PORTIONS", payload: 0 });
    dispatch({ type: "UPDATE_NEW_RECIPESCALER_INGREDIENTS", payload: [] });
    dispatch({ type: "SET_IS_USER_SUBMITTED_RECIPESCALER", payload: false });
  }

  // path to logo file
  const logoPath = `${import.meta.env.VITE_PUBLIC_URL}TheFoodIt-logo.png`;
  function handleGeneratePDF() {
    generatePDF(
      updatedRecipeScalerIngredients,
      recipeScalerTotPortions,
      logoPath
    );
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
        <Button onClick={handleGeneratePDF} type="cta">
          Download PDF
        </Button>
        <Button onClick={handleRecalculate} type="submitLarge">
          Recalculate Ingredients
        </Button>
      </div>

      <Footer>
        <Disclairmer
          message={
            "TheFoodIt's Recipe Scaler can make mistakes. Consider verifying important recipes adjustments."
          }
        />
      </Footer>
    </div>
  );
}

export default RecipeScalerResults;
