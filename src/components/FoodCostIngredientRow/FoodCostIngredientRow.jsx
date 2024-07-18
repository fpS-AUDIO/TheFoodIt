import styles from "./FoodCostIngredientRow.module.css";

// Object to convert units to corresponding price units
const unitPriceConversion = {
  ml: "L",
  l: "L",
  g: "KG",
  kg: "KG",
};

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
        type="text"
        placeholder="Ingredient"
        name="name"
        value={ingredient.name}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        className={styles.formInput}
      />
      <input
        type="number"
        placeholder="Quantity"
        name="quantity"
        value={ingredient.quantity}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        className={styles.formInput}
      />
      <select
        name="unit"
        value={ingredient.unit}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        className={styles.formSelect}
      >
        {units.map((unit, i) => (
          <option key={i} value={unit}>
            {unit}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Price"
        name="price"
        value={ingredient.price}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        className={styles.formInput}
      />

      <p className={styles.priceUnit}>/ {unitPriceConversion[unit]}</p>
    </div>
  );
}

export default FoodCostIngredientRow;
