import styles from "./FoodCostResults.module.css";
import { generatePDF } from "./FoodCostResultsPdfHelper";

// redux
import { useSelector, useDispatch } from "react-redux";
import { updateFoodCostData } from "../../../store/slices/foodCostSlice";

// general components
import Button from "../../../components/Button/Button";

// feature components
import FoodCostResultsRow from "../FoodCostResultsRow/FoodCostResultsRow";

function FoodCostResults() {
  // global state
  const dispatch = useDispatch();
  const foodCost = useSelector((store) => store.foodCost);

  function handleRecalculate() {
    dispatch(updateFoodCostData(null));
  }

  // path to logo file
  const logoPath = `${import.meta.env.VITE_PUBLIC_URL}TheFoodIt-logo.png`;
  function handleGeneratePDF() {
    generatePDF(foodCost.userFoodCostData, logoPath);
  }

  if (!foodCost.userFoodCostData)
    return (
      <div className={styles.statsContainer}>
        <p className={styles.initialMessage}>
          To view your food cost result, please complete and submit the form
          first. 😊
        </p>
      </div>
    );

  return (
    <>
      <div className={styles.statsContainer}>
        <h2 className={styles.subTitle}>Dish</h2>
        <div className={styles.subContainer}>
          <div className={styles.statsRow}>
            <p className={styles.label}>Name: </p>
            <p>{foodCost.userFoodCostData.dishName}</p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>Selling Price: </p>
            <p>{foodCost.userFoodCostData.sellingPrice.toFixed(2)} €</p>
          </div>
        </div>

        <h2 className={styles.subTitle}>{`Ingredients (per portion)`}</h2>
        <div className={styles.subContainer}>
          {foodCost.userFoodCostData.ingredients.map((ingredient, index) => {
            return <FoodCostResultsRow ingredient={ingredient} key={index} />;
          })}
        </div>

        <h2 className={styles.subTitle}>Results</h2>
        <div className={styles.subContainer}>
          <div className={styles.statsRow}>
            <p className={styles.label}>Total ingredients costs: </p>
            <p>{foodCost.userFoodCostData.totalIngredientsCost.toFixed(2)} €</p>
          </div>
          <div className={styles.statsRow}>
            <p className={styles.label}>Food Cost: </p>
            <p>{foodCost.userFoodCostData.foodCostPercentage.toFixed(2)} %</p>
          </div>
        </div>
      </div>

      <div className={styles.btnsBox}>
        <Button onClick={handleGeneratePDF} type="cta">
          Download PDF
        </Button>

        <Button onClick={handleRecalculate} type="submitLarge">
          Recalculate Food Cost
        </Button>
      </div>
    </>
  );
}

export default FoodCostResults;
