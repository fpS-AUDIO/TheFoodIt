import { useState } from "react";
import styles from "./RecipeScaler.module.css";

import { useMainContext } from "../../contexts/MainContext";
import {
  validatePortionsFields,
  validateIngredientsScalerSubmit,
  recalcNewIngredientsQuantities,
} from "./recipeScalerHelpers";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import RecipeIngredientsRow from "../../components/RecipeIngredientsRow/RecipeIngredientsRow";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import RecipeScalerResults from "../../components/RecipeScalerResults/RecipeScalerResults";

const units = ["ml", "l", "g", "kg", "piece", "tsp", "tbsp"];

function RecipeScaler() {
  // partially importing global state from custom hook
  const { dispatch, errorMessage, isUserSubmittedRecipeScaler } =
    useMainContext();

  // component's local state containing recipe object
  const [recipeData, setRecipeData] = useState({
    initialQuantityPortions: "",
    desiredQuantityPortions: "",
    ingredients: [
      { name: "", quantity: "", unit: units[0] },
      { name: "", quantity: "", unit: units[0] },
    ],
  });

  // function for controlled elemnts
  function handleChange(e) {
    // destructure from event
    const { name, value } = e.target;

    // update local state object
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  }

  // function for <RecipeIngredientsRow/> component controlled elemnts
  function handleIngredientChange(index, e) {
    // destructure the name and value from the event target
    const { name, value } = e.target;

    // map over the current ingredients array
    const newIngredients = recipeData.ingredients.map((ingredient, i) => {
      // Check if the current index matches the provided index
      if (i === index) {
        // return a new ingredient object with the updated field
        return { ...ingredient, [name]: value };
      }
      // for other ingredients, return them unchanged
      return ingredient;
    });

    // update the recipeData state with the new ingredients array
    setRecipeData({ ...recipeData, ingredients: newIngredients });
  }

  // function adds more <RecipeIngredientsRow/> components and updates local state
  function addIngredient(e) {
    e.preventDefault();
    setRecipeData({
      ...recipeData,
      ingredients: [
        ...recipeData.ingredients,
        { name: "", quantity: "", unit: units[0] },
      ],
    });
  }

  // function controls submit process
  function handleSubmit(e) {
    e.preventDefault();

    // first remove error message to be sure
    dispatch({ type: "CLEAR_ERROR_MESSAGE" });

    // validations
    const isValid1 = validatePortionsFields(
      Number(recipeData.initialQuantityPortions),
      Number(recipeData.desiredQuantityPortions)
    );
    if (!isValid1) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload:
          "Please enter valid portion numbers greater than zero for both initial and desired quantities.",
      });
      return;
    }

    const isValid2 = validateIngredientsScalerSubmit(recipeData.ingredients);
    if (!isValid2) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload:
          "Oops! Please check your inputs. Ensure all ingredient names are filled, quantities are positive numbers, and units are selected correctly.",
      });
      return;
    }

    // calculate new ingredients
    const updatedIngredients = recalcNewIngredientsQuantities(
      recipeData.ingredients,
      Number(recipeData.initialQuantityPortions),
      Number(recipeData.desiredQuantityPortions)
    );

    // update global state
    dispatch({
      type: "UPDATE_RECIPESCALER_TOT_PORTIONS",
      payload: Number(recipeData.desiredQuantityPortions),
    });

    dispatch({
      type: "UPDATE_NEW_RECIPESCALER_INGREDIENTS",
      payload: updatedIngredients,
    });

    dispatch({
      type: "SET_IS_USER_SUBMITTED_RECIPESCALER",
      payload: true,
    });

    // reset input fields
    setRecipeData({
      ...recipeData,
      initialQuantityPortions: "",
      desiredQuantityPortions: "",
      ingredients: [
        { name: "", quantity: "", unit: units[0] },
        { name: "", quantity: "", unit: units[0] },
      ],
    });
  }

  return (
    <>
      <div className={styles.intro}>
        <h4>
          Effortlessly adjust your recipe quantities to fit any number of
          servings. Simply enter the initial and desired portions, and our tool
          will scale the ingredients for you.
        </h4>
        <hr className={styles.hrLine} />
      </div>

      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

      {isUserSubmittedRecipeScaler ? (
        <RecipeScalerResults />
      ) : (
        <div className={styles.formContainer}>
          <form className={styles.recipeForm} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Customize Your Recipe Portions</h2>
            <h3 className={styles.titleSecondary}>
              Enter your details to adjust ingredient quantities:
            </h3>

            <div className={styles.recipeHeader}>
              <label htmlFor="initialQuantityRecipe">Initial Portions №</label>
              <input
                type="number"
                id="initialQuantityRecipe"
                name="initialQuantityPortions"
                placeholder="4"
                required
                value={recipeData.initialQuantityPortions}
                onChange={handleChange}
                className={styles.inputNumber}
              />
            </div>

            <div className={styles.ingredientsRowWrapper}>
              {recipeData.ingredients.map((ingredient, index) => (
                <RecipeIngredientsRow
                  index={index}
                  key={index}
                  ingredient={ingredient}
                  units={units}
                  handleIngredientChange={handleIngredientChange}
                />
              ))}
            </div>

            <div className={styles.recipeFooter}>
              <div className={styles.footerBtnBox}>
                <Button type={"add"} onClick={addIngredient}>
                  Add ingredient
                </Button>
              </div>
              <div className={styles.footerSubmitBtnBox}>
                <label htmlFor="finalQuantityRecipe">
                  Desidered portions №
                </label>
                <input
                  type="number"
                  id="finalQuantityRecipe"
                  name="desiredQuantityPortions"
                  placeholder="7"
                  required
                  value={recipeData.desiredQuantityPortions}
                  onChange={handleChange}
                  className={styles.inputNumber}
                />
              </div>
              <Button type={"submitLarge"} onClick={handleSubmit}>
                Calculate
              </Button>
            </div>
          </form>
          <Footer />
        </div>
      )}
    </>
  );
}

export default RecipeScaler;
