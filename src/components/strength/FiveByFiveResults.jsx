import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProgressChart from './ProgressChart';
import { formatWeight } from '@/util/strengthCalculations';

const EXERCISE_LABELS = {
  squat: '深蹲',
  bench: '臥推',
  deadlift: '硬舉',
  overheadPress: '過頭推舉',
  row: '槓鈴划船'
};

export default function FiveByFiveResults({ results }) {
  if (!results || !results.weeklyData) {
    return null;
  }

  const { weeklyData, chartData, finalWeights, unit } = results;
  const exercises = Object.keys(chartData);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>訓練總結</CardTitle>
          <CardDescription>
            {weeklyData.length} 週訓練計畫 • 每週 3 次訓練
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exercises.map(exercise => {
              const startWeight = chartData[exercise][0]?.weight || 0;
              const endWeight = finalWeights[exercise] || 0;
              const totalGain = endWeight - startWeight;
              const percentGain = ((totalGain / startWeight) * 100).toFixed(1);

              return (
                <div key={exercise} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">{EXERCISE_LABELS[exercise]}</h3>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      起始: {formatWeight(startWeight, unit)}
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      最終: {formatWeight(endWeight, unit)}
                    </p>
                    <p className="text-xs text-teal-600">
                      增加: {formatWeight(totalGain, unit)} ({percentGain}%)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Progress Chart */}
      <ProgressChart
        data={chartData}
        exercises={exercises}
        unit={unit}
        title="重量進程圖"
        programType="5x5"
      />

      {/* Weekly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>每週訓練明細</CardTitle>
          <CardDescription>
            詳細的週次訓練計畫
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {weeklyData.map((weekData) => (
              <div key={weekData.week}>
                <h3 className="font-semibold mb-3 text-lg">Week {weekData.week}</h3>
                <div className="space-y-4">
                  {weekData.sessions.map((sessionData) => (
                    <div key={sessionData.session} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-sm text-muted-foreground">
                        Session {sessionData.session}
                      </h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[140px]">動作</TableHead>
                            <TableHead className="text-right">重量</TableHead>
                            <TableHead className="text-center">組數</TableHead>
                            <TableHead className="text-center">次數</TableHead>
                            <TableHead className="text-right">總容量</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {exercises.map(exercise => {
                            const exerciseData = sessionData.exercises[exercise];
                            return (
                              <TableRow key={exercise}>
                                <TableCell className="font-medium">
                                  {EXERCISE_LABELS[exercise]}
                                </TableCell>
                                <TableCell className="text-right font-semibold text-emerald-600">
                                  {formatWeight(exerciseData.weight, unit)}
                                </TableCell>
                                <TableCell className="text-center">
                                  {exerciseData.sets}
                                </TableCell>
                                <TableCell className="text-center">
                                  {exerciseData.reps}
                                </TableCell>
                                <TableCell className="text-right text-teal-600">
                                  {formatWeight(exerciseData.totalVolume, unit)}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
