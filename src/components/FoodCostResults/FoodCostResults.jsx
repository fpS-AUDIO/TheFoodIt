import styles from "./FoodCostResults.module.css";
import { useMainContext } from "../../contexts/MainContext";
import { generatePDF } from "./FoodCostResultsPdfHelper";
import FoodCostResultsRow from "../FoodCostResultsRow/FoodCostResultsRow";
import Button from "../Button/Button";


function FoodCostResults() {
  const { dispatch, userFoodCostData } = useMainContext();

  function handleRecalculate() {
    dispatch({
      type: "UPDATE_USER_FOODCOST_DATA",
      payload: null,
    });
  }

  // path to logo file
  const logoPath = `${import.meta.env.VITE_PUBLIC_URL}TheFoodIt-logo.png`;
  // Convert the imported image to a base64 string
  const handleGeneratePDF = async () => {
    generatePDF(userFoodCostData, logoPath);
  };

  if (!userFoodCostData)
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
            <p>{userFoodCostData.dishName}</p>
          </div>

          <div className={styles.statsRow}>
            <p className={styles.label}>Selling Price: </p>
            <p>{userFoodCostData.sellingPrice.toFixed(2)} €</p>
          </div>
        </div>

        <h2 className={styles.subTitle}>{`Ingredients (per portion)`}</h2>
        <div className={styles.subContainer}>
          {userFoodCostData.ingredients.map((ingredient, index) => {
            return <FoodCostResultsRow ingredient={ingredient} key={index} />;
          })}
        </div>

        <h2 className={styles.subTitle}>Results</h2>
        <div className={styles.subContainer}>
          <div className={styles.statsRow}>
            <p className={styles.label}>Total ingredients costs: </p>
            <p>{userFoodCostData.totalIngredientsCost.toFixed(2)} €</p>
          </div>
          <div className={styles.statsRow}>
            <p className={styles.label}>Food Cost: </p>
            <p>{userFoodCostData.foodCostPercentage.toFixed(2)} %</p>
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
