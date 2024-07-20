// Helper array with allowed units
export const allowedUnits = ["ml", "l", "g", "kg", "piece"];

// Helper object to convert units to corresponding price units
export const unitPriceConversion = {
  ml: "L",
  l: "L",
  g: "KG",
  kg: "KG",
  piece: "piece",
};

// Function to convert units to base units
export function convertUnitToBase(quantity, unit) {
  // If unit is kg or l, convert to g or ml: convertedValue = originalValue * 1000.
  // Otherwise: convertedValue = originalValue.
  return unit === "l" || unit === "kg" ? quantity * 1000 : quantity;
}

// Function to convert unit names to base units
export function convertUnitNameToBase(originalUnit) {
  if (originalUnit === "kg") {
    return "g";
  } else if (originalUnit === "l") {
    return "ml";
  } else {
    return originalUnit;
  }
}

// Function to calculate the value of an ingredient per portion
export function calculateIngredientOnePortionValue(
  convertedValue,
  totNumServing
) {
  let onePortionValue = convertedValue / totNumServing;

  // Round to maximum 3 decimal places
  onePortionValue = Math.round(onePortionValue * 1000) / 1000;

  return onePortionValue;
}

// Function to calculate ingredient cost
export function calculateIngredientCost(unit, price, convertedValue) {
  // For non-piece units: finalCost = (price * convertedValue) / 1000.
  // For piece units: finalCost = price * quantity.
  // Calculate final cost based on unit type
  let finalCost =
    unit === "piece" ? price * convertedValue : (price * convertedValue) / 1000;

  // Round to maximum 3 decimal places
  finalCost = Math.round(finalCost * 1000) / 1000;

  return finalCost;
}

// Function to calculate food cost percentage
export function calculateFoodCostPercentage(
  totalIngredientsCost,
  sellingPrice
) {
  // foodCostPercentage = (totalIngredientsCost / sellingPrice) * 100.
  return (totalIngredientsCost / sellingPrice) * 100;
}
