import styles from "./RecipeIngredientsRow.module.css";

function RecipeIngredientsRow({
  index,
  ingredient,
  units,
  handleIngredientChange,
}) {
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
    </div>
  );
}

export default RecipeIngredientsRow;
