import { useCallback, useState, useMemo } from "react";
import styles from "./FoodCost.module.css";
import FeatureIntro from "../../components/FeatureIntro/FeatureIntro";
import FoodCostIngredientRow from "../../components/FoodCostIngredientRow/FoodCostIngredientRow";
import Footer from "../../components/Footer/Footer";
import Disclairmer from "../../components/Disclairmer/Disclairmer";
import Button from "../../components/Button/Button";

// Helper array with allowed units
const units = ["ml", "l", "g", "kg", "piece"];

function FoodCost() {
  // Local state
  const initialState = useMemo(
    () => ({
      dishName: "",
      sellingPrice: "",
      numPortionsIngredients: "",
      ingredients: [
        { name: "", quantity: "", unit: units[0], price: "", priceUnit: "" },
        { name: "", quantity: "", unit: units[0], price: "", priceUnit: "" },
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
        { name: "", quantity: "", unit: units[0], price: "", priceUnit: "" },
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
    console.log(localState);
  }

  return (
    <>
      <FeatureIntro>
        FEATURE IS UNDER DEVELOPMENT. IT&apos;S COMING SOON :) Easily calculate
        the food cost for any dish. Enter the ingredients and their quantities,
        and our tool will provide an accurate cost analysis, helping you manage
        your budget and pricing with confidence.
      </FeatureIntro>

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
                units={units}
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
