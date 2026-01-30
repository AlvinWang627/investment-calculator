// Fitness calculation utilities

// Activity level multipliers for TDEE calculation
export const ACTIVITY_LEVELS = {
  sedentary: { label: "久坐 (幾乎不運動)", multiplier: 1.2 },
  light: { label: "輕度活動 (每週運動1-3天)", multiplier: 1.375 },
  moderate: { label: "中度活動 (每週運動3-5天)", multiplier: 1.55 },
  active: { label: "高度活動 (每週運動6-7天)", multiplier: 1.725 },
  veryActive: { label: "非常活躍 (每天運動且體力勞動)", multiplier: 1.9 },
};

// Goal types for macro calculations
export const GOALS = {
  cutting: { label: "減重 (減脂)", calorieAdjustment: -500, proteinPerKg: 2.2 },
  maintain: { label: "維持體重", calorieAdjustment: 0, proteinPerKg: 1.8 },
  bulking: { label: "增重 (增肌)", calorieAdjustment: 300, proteinPerKg: 2.0 },
};

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} BMI value
 */
export function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

/**
 * Get BMI category and description
 * @param {number} bmi - BMI value
 * @returns {object} Category and description
 */
export function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return { categoryKey: "underweight", color: "text-blue-600" };
  } else if (bmi < 24) {
    return { categoryKey: "normal", color: "text-green-600" };
  } else if (bmi < 27) {
    return { categoryKey: "overweight", color: "text-yellow-600" };
  } else if (bmi < 30) {
    return { categoryKey: "obese1", color: "text-orange-600" };
  } else if (bmi < 35) {
    return { categoryKey: "obese2", color: "text-red-600" };
  } else {
    return { categoryKey: "obese3", color: "text-red-700" };
  }
}

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - "male" or "female"
 * @returns {number} BMR in calories
 */
export function calculateBMR(weight, height, age, gender) {
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  return gender === "male" ? baseBMR + 5 : baseBMR - 161;
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level key
 * @returns {number} TDEE in calories
 */
export function calculateTDEE(bmr, activityLevel) {
  const multiplier = ACTIVITY_LEVELS[activityLevel]?.multiplier || 1.2;
  return bmr * multiplier;
}

/**
 * Calculate FFMI (Fat-Free Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} bodyFat - Body fat percentage (0-100)
 * @returns {number|null} FFMI value or null if bodyFat not provided
 */
export function calculateFFMI(weight, height, bodyFat) {
  if (bodyFat === null || bodyFat === undefined || bodyFat === "") {
    return null;
  }
  const leanMass = weight * (1 - bodyFat / 100);
  const heightInMeters = height / 100;
  return leanMass / (heightInMeters * heightInMeters);
}

/**
 * Get FFMI category
 * @param {number} ffmi - FFMI value
 * @param {string} gender - "male" or "female"
 * @returns {object} Category and description
 */
export function getFFMICategory(ffmi, gender) {
  if (ffmi === null) return null;

  if (gender === "male") {
    if (ffmi < 17) {
      return { categoryKey: "low", color: "text-blue-600" };
    } else if (ffmi < 20) {
      return { categoryKey: "average", color: "text-green-600" };
    } else if (ffmi < 22) {
      return { categoryKey: "good", color: "text-green-700" };
    } else if (ffmi < 25) {
      return { categoryKey: "excellent", color: "text-emerald-600" };
    } else {
      return { categoryKey: "superior", color: "text-emerald-700" };
    }
  } else {
    if (ffmi < 14) {
      return { categoryKey: "low", color: "text-blue-600" };
    } else if (ffmi < 17) {
      return { categoryKey: "average", color: "text-green-600" };
    } else if (ffmi < 19) {
      return { categoryKey: "good", color: "text-green-700" };
    } else if (ffmi < 21) {
      return { categoryKey: "excellent", color: "text-emerald-600" };
    } else {
      return { categoryKey: "superior", color: "text-emerald-700" };
    }
  }
}

/**
 * Calculate ideal weight range based on BMI 18.5-24
 * @param {number} height - Height in cm
 * @returns {object} Min and max ideal weight
 */
export function calculateIdealWeight(height) {
  const heightInMeters = height / 100;
  const minWeight = 18.5 * (heightInMeters * heightInMeters);
  const maxWeight = 24 * (heightInMeters * heightInMeters);
  return { min: minWeight, max: maxWeight };
}

/**
 * Calculate macronutrient recommendations
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {number} weight - Weight in kg
 * @param {string} goal - Goal type key
 * @returns {object} Macro recommendations (calories, protein, fat, carbs)
 */
export function calculateMacros(tdee, weight, goal) {
  const goalConfig = GOALS[goal] || GOALS.maintain;
  const targetCalories = tdee + goalConfig.calorieAdjustment;

  // Protein: based on goal (g/kg)
  const proteinGrams = weight * goalConfig.proteinPerKg;
  const proteinCalories = proteinGrams * 4;

  // Fat: 25-30% of total calories
  const fatPercentage = 0.27;
  const fatCalories = targetCalories * fatPercentage;
  const fatGrams = fatCalories / 9;

  // Carbs: remaining calories
  const carbCalories = targetCalories - proteinCalories - fatCalories;
  const carbGrams = carbCalories / 4;

  return {
    calories: Math.round(targetCalories),
    protein: Math.round(proteinGrams),
    fat: Math.round(fatGrams),
    carbs: Math.round(carbGrams),
    proteinCalories: Math.round(proteinCalories),
    fatCalories: Math.round(fatCalories),
    carbCalories: Math.round(carbCalories),
  };
}

/**
 * Calculate all fitness metrics
 * @param {object} userData - User data object
 * @returns {object} All calculated metrics
 */
export function calculateAllMetrics(userData) {
  const { weight, height, age, gender, bodyFat, activityLevel, goal } = userData;

  // BMI
  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);

  // BMR
  const bmr = calculateBMR(weight, height, age, gender);

  // TDEE
  const tdee = calculateTDEE(bmr, activityLevel);

  // FFMI
  const ffmi = calculateFFMI(weight, height, bodyFat);
  const ffmiCategory = getFFMICategory(ffmi, gender);

  // Ideal Weight
  const idealWeight = calculateIdealWeight(height);

  // Macros
  const macros = calculateMacros(tdee, weight, goal);

  return {
    bmi: { value: bmi, category: bmiCategory },
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    ffmi: ffmi !== null ? { value: ffmi, category: ffmiCategory } : null,
    idealWeight,
    macros,
  };
}
