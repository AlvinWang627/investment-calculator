/**
 * LocalStorage utility for nutrient tracker
 */

const STORAGE_KEYS = {
  NUTRIENT_GOALS: 'nutrient_tracker_goals',
  NUTRIENT_INTAKE: 'nutrient_tracker_intake',
  LAST_RESET_DATE: 'nutrient_tracker_last_reset'
};

const DEFAULT_GOALS = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65
};

const DEFAULT_INTAKE = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0
};

/**
 * Get saved nutrient goals
 * @returns {Object} Goals object
 */
export function getNutrientGoals() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NUTRIENT_GOALS);
    return data ? JSON.parse(data) : DEFAULT_GOALS;
  } catch (error) {
    console.error('Error loading nutrient goals:', error);
    return DEFAULT_GOALS;
  }
}

/**
 * Save nutrient goals
 * @param {Object} goals - Goals to save
 */
export function saveNutrientGoals(goals) {
  try {
    localStorage.setItem(STORAGE_KEYS.NUTRIENT_GOALS, JSON.stringify(goals));
    return true;
  } catch (error) {
    console.error('Error saving nutrient goals:', error);
    return false;
  }
}

/**
 * Get current daily intake
 * Handles auto-reset if the date has changed
 * @returns {Object} Intake object
 */
export function getDailyIntake() {
  try {
    const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);
    const today = new Date().toDateString();

    // If it's a new day, reset intake
    if (lastReset !== today) {
      resetDailyIntake();
      return DEFAULT_INTAKE;
    }

    const data = localStorage.getItem(STORAGE_KEYS.NUTRIENT_INTAKE);
    return data ? JSON.parse(data) : DEFAULT_INTAKE;
  } catch (error) {
    console.error('Error loading daily intake:', error);
    return DEFAULT_INTAKE;
  }
}

/**
 * Save daily intake
 * @param {Object} intake - Intake to save
 */
export function saveDailyIntake(intake) {
  try {
    localStorage.setItem(STORAGE_KEYS.NUTRIENT_INTAKE, JSON.stringify(intake));
    
    // Ensure we mark today as the active day so it doesn't auto-reset immediately
    const today = new Date().toDateString();
    localStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
    
    return true;
  } catch (error) {
    console.error('Error saving daily intake:', error);
    return false;
  }
}

/**
 * Reset daily intake to zeros
 */
export function resetDailyIntake() {
  try {
    localStorage.setItem(STORAGE_KEYS.NUTRIENT_INTAKE, JSON.stringify(DEFAULT_INTAKE));
    localStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, new Date().toDateString());
    return DEFAULT_INTAKE;
  } catch (error) {
    console.error('Error resetting daily intake:', error);
    return DEFAULT_INTAKE;
  }
}
