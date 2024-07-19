import { useCallback, useState, useMemo } from "react";

import styles from "./FoodCost.module.css";

import {
  allowedUnits,
  unitPriceConversion,
  convertUnitToBase,
  calculateIngredientCost,
} from "./FoodCostHelper";
import { useMainContext } from "../../contexts/MainContext";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import FeatureIntro from "../../components/FeatureIntro/FeatureIntro";
import FoodCostIngredientRow from "../../components/FoodCostIngredientRow/FoodCostIngredientRow";
import Footer from "../../components/Footer/Footer";
import Disclairmer from "../../components/Disclairmer/Disclairmer";
import Button from "../../components/Button/Button";

/*  ----- COMPONENT WORKFLOW DESCRIPTION -----

1. Input Validation:
    - Ensure all fields are completed.
    - DISH: Selling price and ingredient servings must be positive numbers greater than zero.
    - INGREDIENTS: Quantity and price must be positive numbers greater than zero.

2. Create the actualFoodCostData object and populate it with correct information
   used to make calculations and output on UI.
   Example object structure:
   {
     dishName: "",
     sellingPrice: "",
     totalIngredientsCost: 0,
     foodCostPercentage: 0,
     numberInitialServings: 0,
     ingredients: [
       {
         name: "",
         originalValue: 0,
         convertedValue: 0,
         price: 0,
         originalUnit: "",
         priceUnit: "",
         finalCost: 0,
       },
     ],
   };

2.1 Unit Conversion:
    - Convert units to base units for calculation:
      - If unit is kg or l, convert to g or ml: convertedValue = originalValue * 1000.
      - Otherwise: convertedValue = originalValue.

2.2 Calculate the actual cost for each ingredient:
    - Loop through actualFoodCostData.ingredients to compute the actual cost.
      - For non-piece units: finalCost = (price * convertedValue) / 1000.
      - For piece units: finalCost = price * quantity.

2.3 Calculate totalIngredientsCost:
    - Loop through actualFoodCostData.ingredients and sum the finalCost of each ingredient.

2.4 Calculate actual foodCostPercentage:
    - foodCostPercentage = (totalIngredientsCost / sellingPrice) * 100.

2.5 Save to global state:
    - Update the global state with the calculated actualFoodCostData.

*/

/* IMPORTED helper array with allowed units
const allowedUnits = ["ml", "l", "g", "kg", "piece"]; */

function FoodCost() {
  // Global State
  const { dispatch, errorMessage } = useMainContext();

  // Local state
  const initialState = useMemo(
    () => ({
      dishName: "",
      sellingPrice: "",
      numPortionsIngredients: "",
      ingredients: [
        {
          name: "",
          quantity: "",
          unit: allowedUnits[0],
          price: "",
          priceUnit: "",
        },
        {
          name: "",
          quantity: "",
          unit: allowedUnits[0],
          price: "",
          priceUnit: "",
        },
      ],
    }),
    []
  ); // No dependencies, so the object is created only once

  const [localState, setLocalState] = useState(initialState);

  // Function to update local state
  const handleUpdateLocalState = useCallback(function (event) {
    const { name, value } = event.target;

    setLocalState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }, []); // No dependencies, so the function is created only once

  // Function to remove ingredient
  function handleRemoveIngredient(e) {
    e.preventDefault();

    // leave at list one ingredient
    if (localState.ingredients.length <= 1) return;
    setLocalState((currentState) => ({
      ...currentState,
      ingredients: currentState.ingredients.slice(0, -1),
    }));
  }

  // Function to add ingredient
  function handleAddIngredient(e) {
    e.preventDefault();
    setLocalState((currentState) => ({
      ...currentState,
      ingredients: [
        ...currentState.ingredients,
        {
          name: "",
          quantity: "",
          unit: allowedUnits[0],
          price: "",
          priceUnit: "",
        },
      ],
    }));
  }

  // Function for controlled elements in <FoodCostIngredientRow/>
  const handleIngredientChange = useCallback(
    function (index, e) {
      const { name, value } = e.target;

      const newIngredients = localState.ingredients.map((ingredient, i) => {
        if (i === index) {
          return { ...ingredient, [name]: value };
        }
        return ingredient;
      });

      setLocalState((currentState) => ({
        ...currentState,
        ingredients: newIngredients,
      }));
    },
    [localState.ingredients]
  ); // Dependencies array includes localState.ingredients

  // Function to handle form submission
  function handleSubmitFoodCost(e) {
    e.preventDefault();

    // first remove error message just to be sure
    dispatch({ type: "CLEAR_ERROR_MESSAGE" });

    // ----- 1. Input Validation -----

    // Check if dishName, sellingPrice, and numPortionsIngredients are filled
    if (
      !localState.dishName ||
      !localState.sellingPrice ||
      !localState.numPortionsIngredients
    ) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "Please fill out all the required fields for the dish.",
      });
      return;
    }

    // Check if sellingPrice and numPortionsIngredients are positive numbers greater than zero
    if (
      parseFloat(localState.sellingPrice) <= 0 ||
      parseFloat(localState.numPortionsIngredients) <= 0
    ) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload:
          "Selling price and servings must be positive numbers greater than zero.",
      });
      return;
    }

    // Check if each ingredient has name, quantity, unit, and price filled, and that quantity and price are positive numbers
    for (const ingredient of localState.ingredients) {
      if (
        !ingredient.name ||
        !ingredient.quantity ||
        !ingredient.price ||
        !ingredient.unit
      ) {
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload:
            "Please fill out all the required fields for each ingredient.",
        });
        return;
      }
      if (
        parseFloat(ingredient.quantity) <= 0 ||
        parseFloat(ingredient.price) <= 0
      ) {
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload:
            "Quantity and price for each ingredient must be positive numbers greater than zero.",
        });
        return;
      }
    }

    // ----- 2. Create the actualFoodCostData object and populate it with correct information -----

    const actualFoodCostData = {
      dishName: localState.dishName,
      sellingPrice: Number(localState.sellingPrice),
      totalIngredientsCost: 0,
      foodCostPercentage: 0,
      numberInitialServings: Number(localState.numPortionsIngredients),
      ingredients: [],
    };

    // ----- 2.1 Unit Conversion -----

    // - Convert units to base units for calculation:

    actualFoodCostData.ingredients = localState.ingredients.map(
      (ingredient) => {
        return {
          name: ingredient.name,
          originalValue: Number(ingredient.quantity),
          convertedValue: convertUnitToBase(
            Number(ingredient.quantity),
            ingredient.unit
          ),
          price: Number(ingredient.price),
          originalUnit: ingredient.unit,
          priceUnit: unitPriceConversion[ingredient.unit],
          finalCost: calculateIngredientCost(),
        };
      }
    );

    console.log(actualFoodCostData);
  }

  return (
    <>
      <FeatureIntro>
        Easily calculate the food cost for any dish. Enter the ingredients and
        their quantities, and our tool will provide an accurate cost analysis,
        helping you manage your budget and pricing with confidence.
      </FeatureIntro>

      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

      <div className={styles.wrapper}>
        <form className={styles.contentBox} onSubmit={handleSubmitFoodCost}>
          <div className={styles.contentHeader}>
            <div className={styles.headerRow}>
              <label htmlFor="dishName" className={styles.label}>
                Dish Name:
              </label>
              <input
                id="dishName"
                name="dishName"
                type="text"
                required
                placeholder="Spaghetti Carbonara"
                className={styles.inputText}
                value={localState.dishName}
                onChange={handleUpdateLocalState}
              />
            </div>
            <div className={`${styles.headerRow} ${styles.long}`}>
              <label htmlFor="sellingPrice" className={styles.label}>
                Selling Price:
              </label>
              <input
                id="sellingPrice"
                name="sellingPrice"
                type="number"
                required
                placeholder="12"
                className={styles.inputNumber}
                value={localState.sellingPrice}
                onChange={handleUpdateLocalState}
              />
              <p className={styles.label}>€</p>
            </div>

            <div className={`${styles.headerRow} ${styles.long}`}>
              <label htmlFor="numPortionsIngredients" className={styles.label}>
                Ingredients for:
              </label>
              <input
                id="numPortionsIngredients"
                name="numPortionsIngredients"
                type="number"
                required
                placeholder="8"
                className={styles.inputNumber}
                value={localState.numPortionsIngredients}
                onChange={handleUpdateLocalState}
              />
              <p className={styles.label}>servings</p>
            </div>
          </div>
          <div className={styles.contentBody}>
            {localState.ingredients.map((ingredient, index) => (
              <FoodCostIngredientRow
                index={index}
                key={index}
                ingredient={ingredient}
                units={allowedUnits}
                handleIngredientChange={handleIngredientChange}
              />
            ))}
          </div>
          <div className={styles.contentFooter}>
            <div className={styles.footerBtnBox}>
              <Button type={"add"} onClick={handleAddIngredient}>
                + Add ingredient
              </Button>
              <Button type={"delete"} onClick={handleRemoveIngredient}>
                —
              </Button>
            </div>
            <Button type={"submitLarge"} onClick={handleSubmitFoodCost}>
              Calculate Food Cost
            </Button>
          </div>
        </form>

        <Footer>
          <Disclairmer
            message={
              "TheFoodIt's Food Cost Calculator can make mistakes. Consider verifying important calculations."
            }
          />
        </Footer>
      </div>
    </>
  );
}

export default FoodCost;
