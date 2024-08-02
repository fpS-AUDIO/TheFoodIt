// ----- HELPER FUNCTIONS TO CALUCLATE NUTRITION STATS -----

// function to calculate BMR
export function calculateBMI(dataStats) {
  // FORMULA to Calculate Body Mass Index:
  // BMI = weight / (height * height)

  // transform cm height in m
  const heightMeters = dataStats.height / 100;

  // calculate the actual BMI
  const correctBMI = dataStats.weight / (heightMeters * heightMeters);

  return correctBMI;
}

// function to calculate BMR
export function calculateBMR(dataStats) {
  // FORMULA to Calculate Basal Metabolic Rate (BMR)
  // For men: BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age in years) + 5
  // For women: BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age in years) - 161

  const wightKg = dataStats.weight;
  const heightCm = dataStats.height;
  const ageYears = dataStats.age;

  const neutralBMR = 10 * wightKg + 6.25 * heightCm - 5 * ageYears;
  let correctBMR;

  if (dataStats.gender === `male`) correctBMR = neutralBMR + 5;
  if (dataStats.gender === `female`) correctBMR = neutralBMR - 161;

  return Math.round(correctBMR);
}

export function calculateTDEE(bmr, pal, goal) {
  // Calculate TDEE
  let tdee = bmr * pal;

  // Adjust TDEE for weight loss
  if (goal === "weight") {
    tdee -= 500; // Suggest a moderate deficit
  }

  // Calculate TDEE with estimated +10% TEF
  const tdeeWithTEF = tdee * 1.1;

  return { tdee, tdeeWithTEF };
}

// function to calculate Macronutrient Distribution
export function calculateMacronutrientDistribution(data, tdeeWithTEF) {
  // Default percentages
  let carbsPercentage;
  let proteinPercentage;
  let fatPercentage;

  // Set percentages based on user's goal
  if (data.goal === "weight") {
    carbsPercentage = 0.4; // 40% carbs
    proteinPercentage = 0.35; // 35% protein
    fatPercentage = 0.25; // 25% fat
  } else if (data.goal === "muscle") {
    carbsPercentage = 0.5; // 50% carbs
    proteinPercentage = 0.3; // 30% protein
    fatPercentage = 0.2; // 20% fat
  } else if (data.goal === "maintenance") {
    carbsPercentage = 0.5; // 50% carbs
    proteinPercentage = 0.2; // 20% protein
    fatPercentage = 0.3; // 30% fat
  }

  // Calculate actual grams of macronutrients
  const carbsGrams = (tdeeWithTEF * carbsPercentage) / 4;
  const proteinGrams = (tdeeWithTEF * proteinPercentage) / 4;
  const fatGrams = (tdeeWithTEF * fatPercentage) / 9;

  // Return the calculated distribution
  return {
    carbs: Math.round(carbsGrams),
    proteins: Math.round(proteinGrams),
    fats: Math.round(fatGrams),
  };
}
