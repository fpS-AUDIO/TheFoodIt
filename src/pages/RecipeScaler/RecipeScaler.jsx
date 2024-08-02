import styles from "./RecipeScaler.module.css";

import { useCallback, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  setErrorMessage,
} from "../../store/slices/appWrapperSlice";

import {
  validatePortionsFields,
  validateIngredientsScalerSubmit,
  recalcNewIngredientsQuantities,
} from "./recipeScalerHelpers";

import {
  setIsUserSubmittedRecipeScaler,
  updateRecipeScalerIngredients,
  updateRecipeScalerTotPortions,
} from "../../store/slices/recipeScalerSlice";

// general components
import FeatureIntro from "../../components/FeatureIntro/FeatureIntro";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Button from "../../components/Button/Button";
import Disclairmer from "../../components/Disclairmer/Disclairmer";
import Footer from "../../components/Footer/Footer";

// feature components
import RecipeIngredientsRow from "../../features/RecipeScaler/RecipeIngredientsRow/RecipeIngredientsRow";
import RecipeScalerResults from "../../features/RecipeScaler/RecipeScalerResults/RecipeScalerResults";

const units = ["ml", "l", "g", "kg", "piece", "tsp", "tbsp"];

function RecipeScaler() {
  const dispatch = useDispatch();
  const appWrapper = useSelector((store) => store.appWrapper);
  const recipeScaler = useSelector((store) => store.recipeScaler);

  const initialState = useMemo(
    () => ({
      initialQuantityPortions: "",
      desiredQuantityPortions: "",
      ingredients: [
        { name: "", quantity: "", unit: units[0] },
        { name: "", quantity: "", unit: units[0] },
      ],
    }),
    []
  ); // No dependencies, so the object is created only once

  // component's local state containing recipe object
  const [recipeData, setRecipeData] = useState(initialState);

  // function for controlled elements
  const handleChange = useCallback(function (e) {
    // destructure from event
    const { name, value } = e.target;

    // update local state object
    setRecipeData((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }, []); // No dependencies, so the function is created only once

  // function for <RecipeIngredientsRow/> component controlled elements
  const handleIngredientChange = useCallback(
    function (index, e) {
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
      setRecipeData((currentState) => ({
        ...currentState,
        ingredients: newIngredients,
      }));
    },
    [recipeData.ingredients]
  ); // Dependencies array includes recipeData.ingredients

  // function adds more <RecipeIngredientsRow/> components and updates local state
  const addIngredient = useCallback(function (e) {
    e.preventDefault();
    // use a functional update to ensure we work with the most recent state
    setRecipeData((prevState) => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        { name: "", quantity: "", unit: units[0] },
      ],
    }));
  }, []); // No dependencies, so the function is created only once

  const removeLastIngredient = useCallback(
    function (e) {
      e.preventDefault();
      // guard clause to leave at least one ingredient
      if (recipeData.ingredients.length <= 1) return;
      // update state by removing only the last ingredient
      setRecipeData((prevState) => ({
        ...prevState,
        ingredients: prevState.ingredients.slice(0, -1),
      }));
    },
    [recipeData.ingredients]
  ); // Dependencies array includes recipeData.ingredients

  // function controls submit process
  const handleSubmit = useCallback(
    function (e) {
      e.preventDefault();

      // first remove error message to be sure
      dispatch(clearErrorMessage());

      // validations
      const isValid1 = validatePortionsFields(
        Number(recipeData.initialQuantityPortions),
        Number(recipeData.desiredQuantityPortions)
      );
      if (!isValid1) {
        dispatch(
          setErrorMessage(
            "Please enter valid portion numbers greater than zero for both initial and desired quantities."
          )
        );
        return;
      }

      const isValid2 = validateIngredientsScalerSubmit(recipeData.ingredients);
      if (!isValid2) {
        dispatch(
          setErrorMessage(
            "Oops! Please check your inputs. Ensure all ingredient names are filled, quantities are positive numbers, and units are selected correctly."
          )
        );
        return;
      }

      // calculate new ingredients
      const updatedIngredients = recalcNewIngredientsQuantities(
        recipeData.ingredients,
        Number(recipeData.initialQuantityPortions),
        Number(recipeData.desiredQuantityPortions)
      );

      // update global state
      dispatch(
        updateRecipeScalerTotPortions(
          Number(recipeData.desiredQuantityPortions)
        )
      );

      dispatch(updateRecipeScalerIngredients(updatedIngredients));

      dispatch(setIsUserSubmittedRecipeScaler(true));

      // reset input fields
      setRecipeData(initialState);
    },
    [dispatch, recipeData, initialState]
  ); // Dependencies array includes dispatch and recipeData

  return (
    <>
      <FeatureIntro>
        Adjust your recipe quantities to fit any number of servings. Simply
        enter the initial and desired portions, and our tool will scale the
        ingredients for you.
      </FeatureIntro>

      {appWrapper.errorMessage ? (
        <ErrorMessage message={appWrapper.errorMessage} />
      ) : null}

      {recipeScaler.isUserSubmittedRecipeScaler ? (
        <RecipeScalerResults />
      ) : (
        <div className={styles.formContainer}>
          <form className={styles.recipeForm}>
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
                <Button type={"delete"} onClick={removeLastIngredient}>
                  —
                </Button>
              </div>
              <div className={styles.footerSubmitBtnBox}>
                <label htmlFor="finalQuantityRecipe">Desired portions №</label>
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

          <Footer>
            <Disclairmer
              message={
                "TheFoodIt's Recipe Scaler can make mistakes. Consider verifying important recipes adjustments."
              }
            />
          </Footer>
        </div>
      )}
    </>
  );
}

export default RecipeScaler;
