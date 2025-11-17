/**
 * Hypertrophy Training Calculation Utilities
 * Includes PPL and Upper/Lower Split program calculations
 */

/**
 * Calculate Push/Pull/Legs progression program
 * @param {Object} params - Training parameters
 * @param {number} params.weeks - Number of weeks
 * @param {number} params.frequency - Training frequency (3 or 6 days per week)
 * @param {Object} params.pushExercises - Starting weights for push exercises
 * @param {Object} params.pullExercises - Starting weights for pull exercises
 * @param {Object} params.legExercises - Starting weights for leg exercises
 * @param {number} params.sets - Sets per exercise
 * @param {number} params.repsMin - Minimum reps
 * @param {number} params.repsMax - Maximum reps
 * @param {number} params.increment - Weight increment when progressing
 * @param {string} params.unit - Weight unit (kg/lbs)
 * @returns {Object} Training program data
 */
export function calculatePPLProgression({
  weeks = 12,
  frequency = 6,
  pushExercises = {},
  pullExercises = {},
  legExercises = {},
  sets = 3,
  repsMin = 8,
  repsMax = 12,
  increment = 2.5,
  unit = 'kg'
}) {
  const weeklyData = [];
  const progression = {
    push: {},
    pull: {},
    legs: {}
  };

  // Initialize progression tracking
  Object.keys(pushExercises).forEach(exercise => {
    progression.push[exercise] = {
      current: pushExercises[exercise],
      reps: repsMin,
      history: []
    };
  });

  Object.keys(pullExercises).forEach(exercise => {
    progression.pull[exercise] = {
      current: pullExercises[exercise],
      reps: repsMin,
      history: []
    };
  });

  Object.keys(legExercises).forEach(exercise => {
    progression.legs[exercise] = {
      current: legExercises[exercise],
      reps: repsMin,
      history: []
    };
  });

  // Session pattern based on frequency
  const sessionsPerWeek = frequency;
  const sessionPattern = frequency === 3
    ? ['push', 'pull', 'legs']
    : ['push', 'pull', 'legs', 'push', 'pull', 'legs'];

  // Calculate progression for each week
  for (let week = 1; week <= weeks; week++) {
    const weekData = {
      week,
      sessions: []
    };

    for (let sessionIdx = 0; sessionIdx < sessionsPerWeek; sessionIdx++) {
      const sessionType = sessionPattern[sessionIdx];
      const sessionNumber = sessionIdx + 1;

      const sessionData = {
        session: sessionNumber,
        type: sessionType,
        exercises: {}
      };

      const exercisesToUse = sessionType === 'push' ? pushExercises
        : sessionType === 'pull' ? pullExercises
        : legExercises;

      const progressionCategory = progression[sessionType];

      Object.keys(exercisesToUse).forEach(exercise => {
        const exerciseData = progressionCategory[exercise];
        const weight = exerciseData.current;
        const currentReps = exerciseData.reps;

        sessionData.exercises[exercise] = {
          weight: parseFloat(weight.toFixed(2)),
          sets: sets,
          reps: currentReps,
          repRange: `${repsMin}-${repsMax}`,
          totalVolume: parseFloat((weight * sets * currentReps).toFixed(2))
        };

        // Track history for charts
        exerciseData.history.push({
          week,
          session: sessionNumber,
          weight: parseFloat(weight.toFixed(2)),
          reps: currentReps,
          volume: parseFloat((weight * sets * currentReps).toFixed(2))
        });

        // Progressive overload logic: increase reps until hitting max, then increase weight
        if (week < weeks) {
          if (currentReps >= repsMax) {
            // Reached max reps, increase weight and reset to min reps
            exerciseData.current += increment;
            exerciseData.reps = repsMin;
          } else {
            // Still in rep range, increase reps
            exerciseData.reps += 1;
          }
        }
      });

      weekData.sessions.push(sessionData);
    }

    weeklyData.push(weekData);
  }

  // Generate chart data
  const chartData = {
    push: {},
    pull: {},
    legs: {}
  };

  ['push', 'pull', 'legs'].forEach(category => {
    Object.keys(progression[category]).forEach(exercise => {
      chartData[category][exercise] = progression[category].history;
    });
  });

  // Calculate final weights
  const finalWeights = {
    push: {},
    pull: {},
    legs: {}
  };

  ['push', 'pull', 'legs'].forEach(category => {
    Object.keys(progression[category]).forEach(exercise => {
      finalWeights[category][exercise] = progression[category].current;
    });
  });

  return {
    weeklyData,
    chartData,
    finalWeights,
    unit,
    sets,
    repsMin,
    repsMax,
    frequency
  };
}

/**
 * Calculate Upper/Lower Split progression program
 * @param {Object} params - Training parameters
 * @param {number} params.weeks - Number of weeks
 * @param {number} params.frequency - Training frequency (4 days per week)
 * @param {Object} params.upperExercises - Starting weights for upper body exercises
 * @param {Object} params.lowerExercises - Starting weights for lower body exercises
 * @param {number} params.sets - Sets per exercise
 * @param {number} params.repsMin - Minimum reps
 * @param {number} params.repsMax - Maximum reps
 * @param {number} params.increment - Weight increment when progressing
 * @param {string} params.unit - Weight unit (kg/lbs)
 * @returns {Object} Training program data
 */
export function calculateUpperLowerProgression({
  weeks = 12,
  frequency = 4,
  upperExercises = {},
  lowerExercises = {},
  sets = 3,
  repsMin = 8,
  repsMax = 12,
  increment = 2.5,
  unit = 'kg'
}) {
  const weeklyData = [];
  const progression = {
    upper: {},
    lower: {}
  };

  // Initialize progression tracking
  Object.keys(upperExercises).forEach(exercise => {
    progression.upper[exercise] = {
      current: upperExercises[exercise],
      reps: repsMin,
      history: []
    };
  });

  Object.keys(lowerExercises).forEach(exercise => {
    progression.lower[exercise] = {
      current: lowerExercises[exercise],
      reps: repsMin,
      history: []
    };
  });

  // Session pattern: Upper, Lower, Upper, Lower
  const sessionPattern = ['upper', 'lower', 'upper', 'lower'];
  const sessionsPerWeek = 4;

  // Calculate progression for each week
  for (let week = 1; week <= weeks; week++) {
    const weekData = {
      week,
      sessions: []
    };

    for (let sessionIdx = 0; sessionIdx < sessionsPerWeek; sessionIdx++) {
      const sessionType = sessionPattern[sessionIdx];
      const sessionNumber = sessionIdx + 1;

      const sessionData = {
        session: sessionNumber,
        type: sessionType,
        exercises: {}
      };

      const exercisesToUse = sessionType === 'upper' ? upperExercises : lowerExercises;
      const progressionCategory = progression[sessionType];

      Object.keys(exercisesToUse).forEach(exercise => {
        const exerciseData = progressionCategory[exercise];
        const weight = exerciseData.current;
        const currentReps = exerciseData.reps;

        sessionData.exercises[exercise] = {
          weight: parseFloat(weight.toFixed(2)),
          sets: sets,
          reps: currentReps,
          repRange: `${repsMin}-${repsMax}`,
          totalVolume: parseFloat((weight * sets * currentReps).toFixed(2))
        };

        // Track history for charts
        exerciseData.history.push({
          week,
          session: sessionNumber,
          weight: parseFloat(weight.toFixed(2)),
          reps: currentReps,
          volume: parseFloat((weight * sets * currentReps).toFixed(2))
        });

        // Progressive overload logic
        if (week < weeks) {
          if (currentReps >= repsMax) {
            exerciseData.current += increment;
            exerciseData.reps = repsMin;
          } else {
            exerciseData.reps += 1;
          }
        }
      });

      weekData.sessions.push(sessionData);
    }

    weeklyData.push(weekData);
  }

  // Generate chart data
  const chartData = {
    upper: {},
    lower: {}
  };

  ['upper', 'lower'].forEach(category => {
    Object.keys(progression[category]).forEach(exercise => {
      chartData[category][exercise] = progression[category].history;
    });
  });

  // Calculate final weights
  const finalWeights = {
    upper: {},
    lower: {}
  };

  ['upper', 'lower'].forEach(category => {
    Object.keys(progression[category]).forEach(exercise => {
      finalWeights[category][exercise] = progression[category].current;
    });
  });

  return {
    weeklyData,
    chartData,
    finalWeights,
    unit,
    sets,
    repsMin,
    repsMax,
    frequency
  };
}

/**
 * Format weight with unit
 * @param {number} weight - Weight value
 * @param {string} unit - Weight unit
 * @returns {string} Formatted weight string
 */
export function formatWeight(weight, unit) {
  return `${weight.toFixed(1)} ${unit}`;
}
