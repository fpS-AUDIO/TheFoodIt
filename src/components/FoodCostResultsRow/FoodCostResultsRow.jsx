import { useEffect, useState } from "react";
import styles from "./FoodCostResultsRow.module.css";
import convert from "convert-units";

function FoodCostResultsRow({ ingredient }) {
  const [onePortionValue, setOnePortionValue] = useState(
    ingredient.onePortionValue
  );
  const [bestUnit, setBestUnit] = useState(ingredient.baseUnit);

  useEffect(() => {
    if (ingredient.baseUnit === `piece`) return;

    // converting to the best unit for better UX using "convert-units"
    const convertedUnitObject = convert(ingredient.onePortionValue)
      .from(ingredient.baseUnit)
      .toBest();

    // destructuring
    const { val, unit } = convertedUnitObject;

    // updating local state
    setOnePortionValue(() => val);
    setBestUnit(() => unit);
  }, []);

  return (
    <div className={styles.statsRowLong}>
      <p className={`${styles.label} ${styles.firstChild}`}>
        {ingredient.name}
      </p>
      <p
        className={`${styles.ingredientStats} ${styles.secondChild}`}
      >{`${onePortionValue} ${bestUnit} at ${ingredient.price} € / ${ingredient.priceUnit}`}</p>
      <p
        className={`${styles.ingredientStatsCost} ${styles.thirdChild}`}
      >{`${ingredient.finalCostPerPortion.toFixed(2)} €`}</p>
    </div>
  );
}

export default FoodCostResultsRow;
