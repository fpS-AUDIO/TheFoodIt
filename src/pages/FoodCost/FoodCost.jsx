import styles from "./FoodCost.module.css";

import { useCallback, useState, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  setErrorMessage,
} from "../../store/slices/appLayoutSlice";
import { updateFoodCostData } from "../../store/slices/foodCostSlice";

import {
  allowedUnits,
  unitPriceConversion,
  convertUnitNameToBase,
  convertUnitToBase,
  calculateIngredientOnePortionValue,
  calculateIngredientCost,
  calculateFoodCostPercentage,
} from "./FoodCostHelper";

// general components
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import FeatureIntro from "../../components/FeatureIntro/FeatureIntro";
import Footer from "../../components/Footer/Footer";
import Disclairmer from "../../components/Disclairmer/Disclairmer";
import Button from "../../components/Button/Button";

// feature components
import FoodCostIngredientRow from "../../features/FoodCost/FoodCostIngredientRow/FoodCostIngredientRow";
import FoodCostAccordian from "../../features/FoodCost/FoodCostAccordian/FoodCostAccordian";
import FoodCostResults from "../../features/FoodCost/FoodCostResults/FoodCostResults";

/*  ----- COMPONENT WORKFLOW DESCRIPTION -----

1. Input Validation:
    - Ensure all required fields for the dish and ingredients are completed.
    - DISH: Validate that the selling price and number of servings are positive numbers greater than zero.
    - INGREDIENTS: Validate that each ingredient has a name, quantity, unit, and price, and that quantity and price are positive numbers greater than zero.
    - If validation fails, display an appropriate error message using the global state and halt further processing.

2. Create the actualFoodCostData object:
    - Populate the object with necessary information for calculations and UI output.
    - Example object structure:
      {
        dishName: "",
        sellingPrice: 0,
        totalIngredientsCost: 0,
        foodCostPercentage: 0,
        numberInitialServings: 0,
        ingredients: [
          {
            name: "",
            originalValue: 0,
            convertedValue: 0,
            onePortionValue: 0,
            price: 0,
            originalUnit: "",
            baseUnit: "",
            priceUnit: "",
            finalCostPerPortion: 0,
          },
        ],
      };

3. Unit Conversion:
    - Convert ingredient quantities to base units for calculation:
      - If the unit is kg or l, convert to g or ml: convertedValue = originalValue * 1000.
      - Otherwise: convertedValue = originalValue.
    - Calculate the weight/value of each ingredient per one portion:
      - onePortionValue = convertedValue / total number of servings.

4. Calculate Ingredient Costs:
    - Loop through actualFoodCostData.ingredients to compute the actual cost for each ingredient.
      - For non-piece units: finalCostPerPortion = (price * onePortionValue) / 1000.
      - For piece units: finalCostPerPortion = price * onePortionValue.
    - Round the final cost to a maximum of three decimal places.

5. Calculate Total Ingredients Cost:
    - Sum the finalCostPerPortion of each ingredient to get the total cost of ingredients.

6. Calculate Food Cost Percentage:
    - foodCostPercentage = (totalIngredientsCost / sellingPrice) * 100.

7. Update Global State:
    - Update the global state with the calculated actualFoodCostData.

8. Display Results:
    - Display the calculated food cost data in the UI using the updated global state.

9. Reset Form:
    - After successful submission and calculation, reset the local state to the initial state to clear the form.
*/

function FoodCost() {
  // Global State
  const dispatch = useDispatch();
  const appLayout = useSelector((store) => store.appLayout);
  const foodCost = useSelector((store) => store.foodCost);

  // Local state initialization using useMemo for memoization
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
  );

  const [localState, setLocalState] = useState(initialState);

  // Function to update local state
  function handleUpdateLocalState(event) {
    const { name, value } = event.target;
    setLocalState((prevState) => ({ ...prevState, [name]: value }));
  }

  // Function to remove ingredient
  function handleRemoveIngredient(event) {
    event.preventDefault();
    if (localState.ingredients.length <= 1) return;
    setLocalState((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.slice(0, -1),
    }));
  }

  // Function to add ingredient
  function handleAddIngredient(event) {
    event.preventDefault();
    setLocalState((prevState) => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
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
    function (index, event) {
      const { name, value } = event.target;
      const newIngredients = localState.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [name]: value } : ingredient
      );
      setLocalState((prevState) => ({
        ...prevState,
        ingredients: newIngredients,
      }));
    },
    [localState.ingredients]
  );

  // Validate inputs function
  function validateInputs() {
    // Check if dishName, sellingPrice, and numPortionsIngredients are filled
    if (
      !localState.dishName ||
      !localState.sellingPrice ||
      !localState.numPortionsIngredients
    ) {
      return "Please fill out all the required fields for the dish in a correct way.";
    }

    // Check if sellingPrice and numPortionsIngredients are positive numbers greater than zero
    if (
      parseFloat(localState.sellingPrice) <= 0 ||
      parseFloat(localState.numPortionsIngredients) <= 0
    ) {
      return "Selling price and servings must be positive numbers greater than zero.";
    }

    // Check if each ingredient has name, quantity, unit, and price filled, and that quantity and price are positive numbers
    for (const ingredient of localState.ingredients) {
      if (
        !ingredient.name ||
        !ingredient.quantity ||
        !ingredient.price ||
        !ingredient.unit
      ) {
        return "Please fill out all the required fields for each ingredient.";
      }
      if (
        parseFloat(ingredient.quantity) <= 0 ||
        parseFloat(ingredient.price) <= 0
      ) {
        return "Quantity and price for each ingredient must be positive numbers greater than zero.";
      }
    }

    return null;
  }

  // Function to create actualFoodCostData object
  function createActualFoodCostData(state) {
    const actualFoodCostData = {
      dishName: state.dishName,
      sellingPrice: Number(state.sellingPrice),
      totalIngredientsCost: 0,
      foodCostPercentage: 0,
      numberInitialServings: Number(state.numPortionsIngredients),
      ingredients: state.ingredients.map((ingredient) => ({
        name: ingredient.name,
        originalValue: Number(ingredient.quantity),
        convertedValue: convertUnitToBase(
          Number(ingredient.quantity),
          ingredient.unit
        ),
        onePortionValue: 0,
        price: Number(ingredient.price),
        originalUnit: ingredient.unit,
        baseUnit: convertUnitNameToBase(ingredient.unit),
        priceUnit: unitPriceConversion[ingredient.unit],
        finalCostPerPortion: 0,
      })),
    };

    // Calculate the weight/value of each ingredient per one portion
    actualFoodCostData.ingredients = actualFoodCostData.ingredients.map(
      (ingredient) => ({
        ...ingredient,
        onePortionValue: calculateIngredientOnePortionValue(
          ingredient.convertedValue,
          actualFoodCostData.numberInitialServings
        ),
      })
    );

    // Calculate the actual cost for each ingredient
    actualFoodCostData.ingredients = actualFoodCostData.ingredients.map(
      (ingredient) => ({
        ...ingredient,
        finalCostPerPortion: calculateIngredientCost(
          ingredient.originalUnit,
          ingredient.price,
          ingredient.onePortionValue
        ),
      })
    );

    // Calculate totalIngredientsCost
    actualFoodCostData.totalIngredientsCost =
      actualFoodCostData.ingredients.reduce((totalCosts, ingredient) => {
        return totalCosts + ingredient.finalCostPerPortion;
      }, 0);

    // Calculate actual foodCostPercentage
    actualFoodCostData.foodCostPercentage = calculateFoodCostPercentage(
      actualFoodCostData.totalIngredientsCost,
      actualFoodCostData.sellingPrice
    );

    return actualFoodCostData;
  }

  // Function to handle form submission
  function handleSubmitFoodCost(event) {
    event.preventDefault();

    // Validate inputs
    const error = validateInputs();
    if (error) {
      dispatch(setErrorMessage(error));
      return;
    }

    // Clear any existing error messages
    dispatch(clearErrorMessage());

    // Create the actualFoodCostData object
    const actualFoodCostData = createActualFoodCostData(localState);

    // Update global state with the calculated actualFoodCostData
    dispatch(updateFoodCostData(actualFoodCostData));

    // Reset the form
    setLocalState(initialState);
  }

  return (
    <>
      <FeatureIntro>
        Easily calculate the food cost for any dish. Enter the ingredients and
        their quantities, and our tool will provide a cost analysis, helping you
        manage your budget and pricing with confidence. Consider verifying
        important calculations.
      </FeatureIntro>
      {appLayout.errorMessage ? (
        <ErrorMessage message={appLayout.errorMessage} />
      ) : null}

      <div className={styles.wrapper}>
        {foodCost.userFoodCostData ? (
          <FoodCostResults />
        ) : (
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
                <label
                  htmlFor="numPortionsIngredients"
                  className={styles.label}
                >
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
        )}

        <FoodCostAccordian />
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
