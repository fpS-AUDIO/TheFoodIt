// conversion factors for units to their standard counterparts (grams for weight, milliliters for volume)
const unitConversions = {
  kg: 1000, // 1 kg = 1000 g
  l: 1000, // 1 l = 1000 ml
  tsp: 4.92892, // 1 tsp = 4.92892 ml
  tbsp: 14.7868, // 1 tbsp = 14.7868 ml
};

// converts the quantity to a smaller unit if the value is less than 1
function convertToSmallerUnitIfNeeded(quantity, unit) {
  // Check if the unit is liters and the quantity is less than 1
  if (unit === "l" && quantity < 1) {
    return {
      quantity: quantity * unitConversions[unit], // Convert liters to milliliters
      unit: "ml",
    };
  }
  // Check if the unit is kilograms and the quantity is less than 1
  else if (unit === "kg" && quantity < 1) {
    return {
      quantity: quantity * unitConversions[unit], // Convert kilograms to grams
      unit: "g",
    };
  }
  // Return the original quantity and unit if no conversion is needed
  return { quantity, unit };
}

// converts the quantity to a larger unit if the value is more than or equal to 1000
function convertToLargerUnitIfNeeded(quantity, unit) {
  // Check if the unit is grams and the quantity is more than or equal to 1000
  if (unit === "g" && quantity >= 1000) {
    return {
      quantity: quantity / unitConversions["kg"], // Convert grams to kilograms
      unit: "kg",
    };
  }
  // Check if the unit is milliliters and the quantity is more than or equal to 1000
  else if (unit === "ml" && quantity >= 1000) {
    return {
      quantity: quantity / unitConversions["l"], // Convert milliliters to liters
      unit: "l",
    };
  }
  // Return the original quantity and unit if no conversion is needed
  return { quantity, unit };
}

// validates the ingredient data to ensure it is ready for processing
export function validatePortionsFields(initQuantity, finalQuantity) {
  // Check if initial and final quantities are valid numbers greater than 0
  if (
    !initQuantity ||
    isNaN(initQuantity) ||
    initQuantity <= 0 ||
    !finalQuantity ||
    isNaN(finalQuantity) ||
    finalQuantity <= 0
  ) {
    return false;
  } else {
    return true;
  }
}
// validates the ingredient data to ensure it is ready for processing
export function validateIngredientsScalerSubmit(ingredients) {
  for (let ingredient of ingredients) {
    // Convert quantity to a number for validation
    const quantity = Number(ingredient.quantity);

    // Check if any field is empty, NaN, undefined, or negative
    if (
      !ingredient.name ||
      ingredient.name.trim() === "" ||
      ingredient.quantity === "" ||
      isNaN(quantity) ||
      quantity <= 0 ||
      !ingredient.unit ||
      ingredient.unit.trim() === ""
    ) {
      return false;
    }
  }
  return true;
}

// recalculates ingredient quantities based on initial and desired portions
export function recalcNewIngredientsQuantities(
  arrayIngredients,
  initialPortions,
  desiredPortions
) {
  return arrayIngredients.map((ingredient) => {
    // Calculate the quantity per one portion
    const quantityPer1PAX = Number(ingredient.quantity) / initialPortions;

    // Adjust the quantity for the desired portions
    const adjustedQuantity = quantityPer1PAX * desiredPortions;
    let finalQuantity = adjustedQuantity;
    let finalUnit = ingredient.unit;

    // Convert to a smaller unit if needed
    let converted = convertToSmallerUnitIfNeeded(finalQuantity, finalUnit);
    finalQuantity = converted.quantity;
    finalUnit = converted.unit;

    // Convert to a larger unit if needed
    converted = convertToLargerUnitIfNeeded(finalQuantity, finalUnit);
    finalQuantity = converted.quantity;
    finalUnit = converted.unit;

    // Return the ingredient with the adjusted quantity and unit
    return {
      name: ingredient.name,
      quantity: finalQuantity.toFixed(2), // Keep two decimal places for precision
      unit: finalUnit,
    };
  });
}
