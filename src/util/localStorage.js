/**
 * LocalStorage utility for saving and loading training history
 */

const STORAGE_KEYS = {
  FIVE_BY_FIVE: 'strengthTraining_5x5',
  FIVE_THREE_ONE: 'strengthTraining_531',
  PPL: 'hypertrophy_ppl',
  UPPER_LOWER: 'hypertrophy_upperLower',
  HISTORY: 'strengthTraining_history'
};

/**
 * Save 5x5 program data
 * @param {Object} data - Program data to save
 */
export function save5x5Data(data) {
  try {
    const timestamp = new Date().toISOString();
    const saveData = {
      ...data,
      savedAt: timestamp
    };
    localStorage.setItem(STORAGE_KEYS.FIVE_BY_FIVE, JSON.stringify(saveData));

    // Also save to history
    addToHistory('5x5', saveData);

    return true;
  } catch (error) {
    console.error('Error saving 5x5 data:', error);
    return false;
  }
}

/**
 * Load 5x5 program data
 * @returns {Object|null} Saved data or null if not found
 */
export function load5x5Data() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FIVE_BY_FIVE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading 5x5 data:', error);
    return null;
  }
}

/**
 * Save 5/3/1 program data
 * @param {Object} data - Program data to save
 */
export function save531Data(data) {
  try {
    const timestamp = new Date().toISOString();
    const saveData = {
      ...data,
      savedAt: timestamp
    };
    localStorage.setItem(STORAGE_KEYS.FIVE_THREE_ONE, JSON.stringify(saveData));

    // Also save to history
    addToHistory('531', saveData);

    return true;
  } catch (error) {
    console.error('Error saving 5/3/1 data:', error);
    return false;
  }
}

/**
 * Load 5/3/1 program data
 * @returns {Object|null} Saved data or null if not found
 */
export function load531Data() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FIVE_THREE_ONE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading 5/3/1 data:', error);
    return null;
  }
}

/**
 * Save Push/Pull/Legs program data
 * @param {Object} data - Program data to save
 */
export function savePPLData(data) {
  try {
    const timestamp = new Date().toISOString();
    const saveData = {
      ...data,
      savedAt: timestamp
    };
    localStorage.setItem(STORAGE_KEYS.PPL, JSON.stringify(saveData));

    // Also save to history
    addToHistory('ppl', saveData);

    return true;
  } catch (error) {
    console.error('Error saving PPL data:', error);
    return false;
  }
}

/**
 * Load Push/Pull/Legs program data
 * @returns {Object|null} Saved data or null if not found
 */
export function loadPPLData() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PPL);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading PPL data:', error);
    return null;
  }
}

/**
 * Save Upper/Lower Split program data
 * @param {Object} data - Program data to save
 */
export function saveUpperLowerData(data) {
  try {
    const timestamp = new Date().toISOString();
    const saveData = {
      ...data,
      savedAt: timestamp
    };
    localStorage.setItem(STORAGE_KEYS.UPPER_LOWER, JSON.stringify(saveData));

    // Also save to history
    addToHistory('upperLower', saveData);

    return true;
  } catch (error) {
    console.error('Error saving Upper/Lower data:', error);
    return false;
  }
}

/**
 * Load Upper/Lower Split program data
 * @returns {Object|null} Saved data or null if not found
 */
export function loadUpperLowerData() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.UPPER_LOWER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading Upper/Lower data:', error);
    return null;
  }
}

/**
 * Add entry to training history
 * @param {string} programType - Type of program (5x5 or 531)
 * @param {Object} data - Program data
 */
function addToHistory(programType, data) {
  try {
    const history = getHistory();
    const entry = {
      id: Date.now(),
      programType,
      savedAt: data.savedAt,
      summary: generateSummary(programType, data)
    };

    // Add to beginning of array (most recent first)
    history.unshift(entry);

    // Keep only last 20 entries
    const trimmedHistory = history.slice(0, 20);

    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
}

/**
 * Get training history
 * @returns {Array} Array of history entries
 */
export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
}

/**
 * Clear specific program data
 * @param {string} programType - Type of program (5x5, 531, ppl, or upperLower)
 */
export function clearProgramData(programType) {
  try {
    let key;
    switch (programType) {
      case '5x5':
        key = STORAGE_KEYS.FIVE_BY_FIVE;
        break;
      case '531':
        key = STORAGE_KEYS.FIVE_THREE_ONE;
        break;
      case 'ppl':
        key = STORAGE_KEYS.PPL;
        break;
      case 'upperLower':
        key = STORAGE_KEYS.UPPER_LOWER;
        break;
      default:
        console.error('Unknown program type:', programType);
        return false;
    }
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing program data:', error);
    return false;
  }
}

/**
 * Clear all training data
 */
export function clearAllData() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
}

/**
 * Generate summary for history entry
 * @param {string} programType - Type of program
 * @param {Object} data - Program data
 * @returns {Object} Summary object
 */
function generateSummary(programType, data) {
  if (programType === '5x5') {
    return {
      weeks: data.weeks,
      exercises: Object.keys(data.exercises || {}),
      startingWeights: data.exercises,
      unit: data.unit
    };
  } else if (programType === '531') {
    return {
      cycles: data.cycles,
      exercises: Object.keys(data.maxLifts || {}),
      maxLifts: data.maxLifts,
      unit: data.unit
    };
  } else if (programType === 'ppl') {
    return {
      weeks: data.weeks,
      frequency: data.frequency,
      pushExercises: Object.keys(data.pushExercises || {}),
      pullExercises: Object.keys(data.pullExercises || {}),
      legExercises: Object.keys(data.legExercises || {}),
      unit: data.unit
    };
  } else if (programType === 'upperLower') {
    return {
      weeks: data.weeks,
      frequency: data.frequency,
      upperExercises: Object.keys(data.upperExercises || {}),
      lowerExercises: Object.keys(data.lowerExercises || {}),
      unit: data.unit
    };
  }
  return {};
}

/**
 * Export data as JSON file
 * @param {Object} data - Data to export
 * @param {string} filename - Filename for export
 */
export function exportAsJSON(data, filename = 'training-data.json') {
  try {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exporting data:', error);
    return false;
  }
}

/**
 * Import data from JSON file
 * @param {File} file - File to import
 * @returns {Promise<Object>} Imported data
 */
export function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
}
