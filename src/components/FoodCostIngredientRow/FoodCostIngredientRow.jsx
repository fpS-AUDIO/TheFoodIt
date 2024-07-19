import styles from "./FoodCostIngredientRow.module.css";
import { unitPriceConversion } from "../../pages/FoodCost/FoodCostHelper";

/* IMPORTED object to convert units to corresponding price units
const unitPriceConversion = {
  ml: "L",
  l: "L",
  g: "KG",
  kg: "KG",
  piece: "piece",
};  */



function FoodCostIngredientRow({
  index,
  ingredient,
  units,
  handleIngredientChange,
}) {
  // Destructure unit from the ingredient prop for clarity
  const { unit } = ingredient;

  return (
    <div key={index} className={styles.ingredientRow}>
      <input
        type="number"
        placeholder="Quantity"
        name="quantity"
        value={ingredient.quantity}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        className={`${styles.formInput} ${styles.firstChild}`}
      />
      <select
        name="unit"
        value={ingredient.unit}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        className={`${styles.formSelect} ${styles.secondChild}`}
      >
        {units.map((unit, i) => (
          <option key={i} value={unit}>
            {unit}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Ingredient"
        name="name"
        value={ingredient.name}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        className={`${styles.formInput} ${styles.thirdChild}`}
      />

      <input
        type="number"
        placeholder="Price"
        name="price"
        value={ingredient.price}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        className={`${styles.formInput} ${styles.forthChild}`}
      />

      <p className={`${styles.priceUnit} ${styles.fifthChild}`}>
        € / {unitPriceConversion[unit]}
      </p>
    </div>
  );
}

export default FoodCostIngredientRow;
