import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const COLORS = {
  squat: '#3b82f6',        // blue
  bench: '#10b981',         // green
  deadlift: '#f59e0b',      // amber
  overheadPress: '#8b5cf6', // purple
  row: '#ec4899'            // pink
};

const EXERCISE_LABELS = {
  squat: '深蹲 (Squat)',
  bench: '臥推 (Bench Press)',
  deadlift: '硬舉 (Deadlift)',
  overheadPress: '過頭推舉 (OHP)',
  row: '槓鈴划船 (Row)',
  press: '過頭推舉 (Press)'
};

export default function ProgressChart({ data, exercises, unit = 'kg', title = '重量進程圖', programType = '5x5' }) {
  if (!data || exercises.length === 0) {
    return null;
  }

  // Transform data for recharts
  const chartData = transformDataForChart(data, exercises, programType);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          追蹤各動作的重量進程
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="label"
              className="text-sm"
              tick={{ fill: 'hsl(var(--foreground))' }}
            />
            <YAxis
              label={{ value: `重量 (${unit})`, angle: -90, position: 'insideLeft' }}
              className="text-sm"
              tick={{ fill: 'hsl(var(--foreground))' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => EXERCISE_LABELS[value] || value}
            />
            {exercises.map(exercise => (
              <Line
                key={exercise}
                type="monotone"
                dataKey={exercise}
                stroke={COLORS[exercise] || '#6b7280'}
                strokeWidth={2}
                dot={{ fill: COLORS[exercise] || '#6b7280', r: 4 }}
                activeDot={{ r: 6 }}
                name={exercise}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

/**
 * Transform exercise data into format suitable for recharts
 */
function transformDataForChart(data, exercises, programType) {
  if (programType === '5x5') {
    // For 5x5, data is organized by exercise
    // Each exercise has an array of { week, session, weight, volume }
    const chartData = [];
    const exerciseData = data;

    // Find the maximum length of data
    let maxLength = 0;
    exercises.forEach(exercise => {
      if (exerciseData[exercise] && exerciseData[exercise].length > maxLength) {
        maxLength = exerciseData[exercise].length;
      }
    });

    // Create chart points
    for (let i = 0; i < maxLength; i++) {
      const point = {
        label: `W${Math.floor(i / 3) + 1}-S${(i % 3) + 1}` // Week-Session format
      };

      exercises.forEach(exercise => {
        if (exerciseData[exercise] && exerciseData[exercise][i]) {
          point[exercise] = exerciseData[exercise][i].weight;
        }
      });

      chartData.push(point);
    }

    return chartData;
  } else if (programType === '531') {
    // For 5/3/1, data is organized by exercise
    // Each exercise has an array of { cycle, week, weekName, weight, percent }
    const chartData = [];
    const exerciseData = data;

    // Find the maximum length of data
    let maxLength = 0;
    exercises.forEach(exercise => {
      if (exerciseData[exercise] && exerciseData[exercise].length > maxLength) {
        maxLength = exerciseData[exercise].length;
      }
    });

    // Create chart points
    for (let i = 0; i < maxLength; i++) {
      const point = {};

      // Get label from first exercise
      const firstExercise = exercises[0];
      if (exerciseData[firstExercise] && exerciseData[firstExercise][i]) {
        const dataPoint = exerciseData[firstExercise][i];
        point.label = `C${dataPoint.cycle}-W${dataPoint.week}`;
      } else {
        point.label = `Point ${i + 1}`;
      }

      exercises.forEach(exercise => {
        if (exerciseData[exercise] && exerciseData[exercise][i]) {
          point[exercise] = exerciseData[exercise][i].weight;
        }
      });

      chartData.push(point);
    }

    return chartData;
  }

  return [];
}
