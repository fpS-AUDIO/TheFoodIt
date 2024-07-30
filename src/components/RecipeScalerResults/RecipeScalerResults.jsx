import styles from "./RecipeScalerResults.module.css";

import { generatePDF } from "./RecipeScalerResultsPdfHelper";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsUserSubmittedRecipeScaler,
  updateRecipeScalerIngredients,
  updateRecipeScalerTotPortions,
} from "../../store/slices/recipeScalerSlice";

import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import Disclairmer from "../Disclairmer/Disclairmer";

function RecipeScalerResults() {
  const dispatch = useDispatch();
  const recipeScaler = useSelector((store) => store.recipeScaler);

  function handleRecalculate() {
    dispatch(updateRecipeScalerTotPortions(0));
    dispatch(updateRecipeScalerIngredients([]));
    dispatch(setIsUserSubmittedRecipeScaler(false));
  }

  // path to logo file
  const logoPath = `${import.meta.env.VITE_PUBLIC_URL}TheFoodIt-logo.png`;
  function handleGeneratePDF() {
    generatePDF(
      recipeScaler.updatedRecipeScalerIngredients,
      recipeScaler.recipeScalerTotPortions,
      logoPath
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>
        Ingredients per {recipeScaler.recipeScalerTotPortions} portions:
      </h2>
      {recipeScaler.updatedRecipeScalerIngredients.map((ingredient, index) => (
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
