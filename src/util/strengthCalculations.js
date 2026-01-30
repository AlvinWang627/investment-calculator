/**
 * Strength Training Calculation Utilities
 * Includes 5x5 and 5/3/1 program calculations
 */

/**
 * Calculate 5x5 progression program
 * @param {Object} params - Training parameters
 * @param {number} params.weeks - Number of weeks
 * @param {Object} params.exercises - Starting weights for each exercise
 * @param {number} params.increment - Weight increment per session
 * @param {number} params.deloadPercent - Percentage to reduce on failure (default 10%)
 * @param {string} params.unit - Weight unit (kg/lbs)
 * @returns {Array} Weekly progression data
 */
export function calculate5x5Progression({
  weeks = 12,
  exercises = {},
  increment = 2.5,
  deloadPercent = 10,
  unit = 'kg'
}) {
  const exerciseNames = Object.keys(exercises);
  const weeklyData = [];
  const progression = {};

  // Initialize progression tracking for each exercise
  exerciseNames.forEach(exercise => {
    progression[exercise] = {
      current: exercises[exercise],
      history: []
    };
  });

  // Calculate progression for each week (3 sessions per week)
  for (let week = 1; week <= weeks; week++) {
    const weekData = {
      week,
      sessions: []
    };

    // 3 sessions per week
    for (let session = 1; session <= 3; session++) {
      const sessionData = {
        session,
        exercises: {}
      };

      exerciseNames.forEach(exercise => {
        const weight = progression[exercise].current;

        sessionData.exercises[exercise] = {
          weight: parseFloat(weight.toFixed(2)),
          sets: 5,
          reps: 5,
          totalVolume: weight * 5 * 5
        };

        // Track history for charts
        progression[exercise].history.push({
          week,
          session,
          weight: parseFloat(weight.toFixed(2)),
          volume: weight * 5 * 5
        });

        // Increment weight for next session (for squat, bench, row)
        // Deadlift typically increases every other session
        if (exercise === 'deadlift') {
          if (session % 2 === 0) {
            progression[exercise].current += increment;
          }
        } else {
          progression[exercise].current += increment;
        }
      });

      weekData.sessions.push(sessionData);
    }

    weeklyData.push(weekData);
  }

  // Generate chart data for each exercise
  const chartData = {};
  exerciseNames.forEach(exercise => {
    chartData[exercise] = progression[exercise].history;
  });

  return {
    weeklyData,
    chartData,
    finalWeights: exerciseNames.reduce((acc, exercise) => {
      acc[exercise] = progression[exercise].current;
      return acc;
    }, {}),
    unit
  };
}

/**
 * Calculate 5/3/1 program cycle
 * @param {Object} params - Training parameters
 * @param {number} params.cycles - Number of cycles
 * @param {Object} params.maxLifts - 1RM for each exercise
 * @param {number} params.trainingMaxPercent - Percentage of 1RM to use (default 90%)
 * @param {Object} params.increments - Weight increments per cycle
 * @param {string} params.unit - Weight unit (kg/lbs)
 * @returns {Array} Cycle data with weekly breakdowns
 */
export function calculate531Cycle({
  cycles = 4,
  maxLifts = {},
  trainingMaxPercent = 90,
  increments = { upper: 2.5, lower: 5 },
  unit = 'kg'
}) {
  const exercises = Object.keys(maxLifts);
  const cycleData = [];
  const chartData = {};

  // Initialize chart data
  exercises.forEach(exercise => {
    chartData[exercise] = [];
  });

  // 5/3/1 weekly scheme
  const weeklyScheme = [
    { week: 1, name: 'Week 1 (5/5/5+)', sets: [
      { reps: 5, percent: 65 },
      { reps: 5, percent: 75 },
      { reps: '5+', percent: 85 }
    ]},
    { week: 2, name: 'Week 2 (3/3/3+)', sets: [
      { reps: 3, percent: 70 },
      { reps: 3, percent: 80 },
      { reps: '3+', percent: 90 }
    ]},
    { week: 3, name: 'Week 3 (5/3/1+)', sets: [
      { reps: 5, percent: 75 },
      { reps: 3, percent: 85 },
      { reps: '1+', percent: 95 }
    ]},
    { week: 4, name: 'Deload', sets: [
      { reps: 5, percent: 40 },
      { reps: 5, percent: 50 },
      { reps: 5, percent: 60 }
    ]}
  ];

  // Current training maxes
  const trainingMaxes = {};
  exercises.forEach(exercise => {
    trainingMaxes[exercise] = maxLifts[exercise] * (trainingMaxPercent / 100);
  });

  // Calculate each cycle
  for (let cycle = 1; cycle <= cycles; cycle++) {
    const cycleInfo = {
      cycle,
      weeks: []
    };

    weeklyScheme.forEach(({ week, name, sets }) => {
      const weekInfo = {
        week,
        name,
        exercises: {}
      };

      exercises.forEach(exercise => {
        const trainingMax = trainingMaxes[exercise];
        const isLower = exercise === 'squat' || exercise === 'deadlift';

        weekInfo.exercises[exercise] = {
          trainingMax: parseFloat(trainingMax.toFixed(2)),
          sets: sets.map(({ reps, percent }) => {
            const weight = trainingMax * (percent / 100);
            return {
              reps,
              percent,
              weight: parseFloat(weight.toFixed(2))
            };
          })
        };

        // Track for charts (use heaviest set)
        const heaviestWeight = weekInfo.exercises[exercise].sets[sets.length - 1].weight;
        chartData[exercise].push({
          cycle,
          week,
          weekName: name,
          weight: heaviestWeight,
          percent: sets[sets.length - 1].percent
        });
      });

      cycleInfo.weeks.push(weekInfo);
    });

    cycleData.push(cycleInfo);

    // Increment training maxes for next cycle
    exercises.forEach(exercise => {
      const isLower = exercise === 'squat' || exercise === 'deadlift';
      trainingMaxes[exercise] += isLower ? increments.lower : increments.upper;
    });
  }

  // Calculate projected new 1RM after all cycles
  const projectedMaxes = {};
  exercises.forEach(exercise => {
    const isLower = exercise === 'squat' || exercise === 'deadlift';
    const totalIncrease = cycles * (isLower ? increments.lower : increments.upper);
    // Projected max is training max / 0.9 (since training max is 90% of 1RM)
    projectedMaxes[exercise] = parseFloat(((trainingMaxes[exercise]) / (trainingMaxPercent / 100)).toFixed(2));
  });

  return {
    cycleData,
    chartData,
    startingMaxes: maxLifts,
    projectedMaxes,
    unit
  };
}

/**
 * Format weight with unit
 * @param {number} weight - Weight value
 * @param {string} unit - Unit (kg/lbs)
 * @returns {string} Formatted weight
 */
export function formatWeight(weight, unit = 'kg') {
  return `${weight.toFixed(1)} ${unit}`;
}

/**
 * Calculate estimated 1RM from reps
 * @param {number} weight - Weight lifted
 * @param {number} reps - Number of reps
 * @param {string} formula - Formula to use ('epley' or 'brzycki')
 * @returns {number} Estimated 1RM
 */
export function calculate1RM(weight, reps, formula = 'epley') {
  if (reps === 1) return weight;
  
  if (formula === 'brzycki') {
    // Brzycki formula: 1RM = weight * (36 / (37 - reps))
    return weight * (36 / (37 - reps));
  }
  
  // Epley formula (default): 1RM = weight × (1 + reps/30)
  return weight * (1 + reps / 30);
}

/**
 * Generate 1RM percentage table
 * @param {number} oneRepMax - The 1RM value
 * @returns {Array} Array of objects with percentage, weight, and estimated reps
 */
export function generate1RMTable(oneRepMax) {
  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
  
  // Estimated reps for percentages based on average standards
  // (Approximate values commonly used in strength training)
  const repEstimates = {
    100: 1,
    95: 2,
    90: 4,
    85: 6,
    80: 8,
    75: 10,
    70: 12,
    65: 15,
    60: 20,
    55: 24,
    50: 30
  };

  return percentages.map(percent => ({
    percentage: percent,
    weight: oneRepMax * (percent / 100),
    reps: repEstimates[percent] || '-'
  }));
}

/**
 * Convert between kg and lbs

 * @param {number} weight - Weight value
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted weight
 */
export function convertWeight(weight, fromUnit, toUnit) {
  if (fromUnit === toUnit) return weight;

  if (fromUnit === 'kg' && toUnit === 'lbs') {
    return weight * 2.20462;
  } else if (fromUnit === 'lbs' && toUnit === 'kg') {
    return weight / 2.20462;
  }

  return weight;
}
