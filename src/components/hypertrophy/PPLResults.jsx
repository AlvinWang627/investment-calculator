import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatWeight } from '@/util/hypertrophyCalculations';

const EXERCISE_LABELS = {
  // Push exercises
  benchPress: '臥推',
  overheadPress: '肩推',
  inclinePress: '上斜臥推',
  lateralRaise: '側平舉',
  tricepExtension: '三頭肌伸展',
  // Pull exercises
  deadlift: '硬舉',
  barbellRow: '槓鈴划船',
  pullUp: '引體向上',
  latPulldown: '滑輪下拉',
  bicepCurl: '二頭彎舉',
  // Leg exercises
  squat: '深蹲',
  legPress: '腿推',
  legCurl: '腿彎舉',
  legExtension: '腿伸展',
  calfRaise: '提踵'
};

const SESSION_TYPE_LABELS = {
  push: '🔴 Push Day (推)',
  pull: '🔵 Pull Day (拉)',
  legs: '🟢 Leg Day (腿)'
};

export default function PPLResults({ results }) {
  if (!results || !results.weeklyData) {
    return null;
  }

  const { weeklyData, finalWeights, unit, frequency, sets, repsMin, repsMax } = results;

  // Calculate summary statistics for each category
  const calculateCategoryStats = (category) => {
    if (!finalWeights[category]) return [];

    const exercises = Object.keys(finalWeights[category]);
    return exercises.map(exercise => {
      const exerciseHistory = results.chartData?.[category]?.[exercise];
      const startWeight = exerciseHistory && exerciseHistory.length > 0 ? exerciseHistory[0].weight : 0;
      const endWeight = finalWeights[category][exercise] || 0;
      const totalGain = endWeight - startWeight;
      const percentGain = startWeight > 0 ? ((totalGain / startWeight) * 100).toFixed(1) : 0;

      return {
        exercise,
        startWeight,
        endWeight,
        totalGain,
        percentGain
      };
    });
  };

  const pushStats = calculateCategoryStats('push');
  const pullStats = calculateCategoryStats('pull');
  const legStats = calculateCategoryStats('legs');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Card>
        <CardHeader>
          <CardTitle>訓練總結</CardTitle>
          <CardDescription>
            {weeklyData.length} 週訓練計畫 • 每週 {frequency} 次訓練 • {sets} 組 × {repsMin}-{repsMax} 次
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Push Day Summary */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">🔴 Push Day 進度</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {pushStats.map(({ exercise, startWeight, endWeight, totalGain, percentGain }) => (
                <div key={exercise} className="p-4 border rounded-lg bg-red-50/50 dark:bg-red-950/20">
                  <h4 className="font-semibold text-sm mb-2">{EXERCISE_LABELS[exercise]}</h4>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      起始: {formatWeight(startWeight, unit)}
                    </p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-500">
                      最終: {formatWeight(endWeight, unit)}
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-400">
                      增加: {formatWeight(totalGain, unit)} ({percentGain}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pull Day Summary */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">🔵 Pull Day 進度</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {pullStats.map(({ exercise, startWeight, endWeight, totalGain, percentGain }) => (
                <div key={exercise} className="p-4 border rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                  <h4 className="font-semibold text-sm mb-2">{EXERCISE_LABELS[exercise]}</h4>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      起始: {formatWeight(startWeight, unit)}
                    </p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-500">
                      最終: {formatWeight(endWeight, unit)}
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      增加: {formatWeight(totalGain, unit)} ({percentGain}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leg Day Summary */}
          <div>
            <h3 className="font-semibold text-lg mb-3">🟢 Leg Day 進度</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {legStats.map(({ exercise, startWeight, endWeight, totalGain, percentGain }) => (
                <div key={exercise} className="p-4 border rounded-lg bg-green-50/50 dark:bg-green-950/20">
                  <h4 className="font-semibold text-sm mb-2">{EXERCISE_LABELS[exercise]}</h4>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      起始: {formatWeight(startWeight, unit)}
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-500">
                      最終: {formatWeight(endWeight, unit)}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-400">
                      增加: {formatWeight(totalGain, unit)} ({percentGain}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

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
              <div key={weekData.week} className="border-b pb-6 last:border-b-0">
                <h3 className="font-semibold mb-4 text-lg">第 {weekData.week} 週</h3>
                <div className="space-y-4">
                  {weekData.sessions.map((sessionData) => {
                    const sessionColor = sessionData.type === 'push' ? 'red'
                      : sessionData.type === 'pull' ? 'blue'
                      : 'green';

                    return (
                      <div key={sessionData.session} className={`border rounded-lg p-4 bg-${sessionColor}-50/30 dark:bg-${sessionColor}-950/10`}>
                        <h4 className="font-medium mb-3 text-sm">
                          訓練 {sessionData.session} - {SESSION_TYPE_LABELS[sessionData.type]}
                        </h4>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[160px]">動作</TableHead>
                                <TableHead className="text-right">重量</TableHead>
                                <TableHead className="text-center">組數</TableHead>
                                <TableHead className="text-center">次數</TableHead>
                                <TableHead className="text-center">次數範圍</TableHead>
                                <TableHead className="text-right">總容量</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Object.keys(sessionData.exercises).map(exercise => {
                                const exerciseData = sessionData.exercises[exercise];
                                return (
                                  <TableRow key={exercise}>
                                    <TableCell className="font-medium">
                                      {EXERCISE_LABELS[exercise]}
                                    </TableCell>
                                    <TableCell className={`text-right font-semibold text-${sessionColor}-600 dark:text-${sessionColor}-500`}>
                                      {formatWeight(exerciseData.weight, unit)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {exerciseData.sets}
                                    </TableCell>
                                    <TableCell className="text-center font-semibold">
                                      {exerciseData.reps}
                                    </TableCell>
                                    <TableCell className="text-center text-muted-foreground text-sm">
                                      {exerciseData.repRange}
                                    </TableCell>
                                    <TableCell className={`text-right text-${sessionColor}-700 dark:text-${sessionColor}-400`}>
                                      {formatWeight(exerciseData.totalVolume, unit)}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Tips */}
      <Card>
        <CardHeader>
          <CardTitle>訓練建議</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>漸進超負荷原則：</strong>當你能夠在所有組數中完成最高次數（{repsMax} 次）時，下週增加 {formatWeight(results.chartData.push[Object.keys(results.chartData.push)[0]][0]?.weight || 2.5, unit).split(' ')[1]} 重量，並回到最低次數（{repsMin} 次）。
            </p>
            <p>
              <strong>休息時間：</strong>複合動作（深蹲、硬舉、臥推等）休息 2-3 分鐘，孤立動作（側平舉、二頭彎舉等）休息 60-90 秒。
            </p>
            <p>
              <strong>訓練頻率：</strong>你選擇的是每週 {frequency} 天訓練。確保有足夠的休息和恢復時間。
            </p>
            <p>
              <strong>動作技術：</strong>始終優先考慮正確的動作技術，而非追求更重的重量。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
