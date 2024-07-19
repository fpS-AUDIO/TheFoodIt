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

export function convertUnitToBase(quantity, unit) {
  //   - If unit is kg or l, convert to g or ml: convertedValue = originalValue * 1000.
  //   - Otherwise: convertedValue = originalValue.
  if (unit === "l" || unit === "kg") {
    return quantity * 1000;
  } else {
    return quantity;
  }
}

export function calculateIngredientCost() {}
