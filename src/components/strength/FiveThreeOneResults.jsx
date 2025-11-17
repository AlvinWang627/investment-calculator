import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProgressChart from './ProgressChart';
import { formatWeight } from '@/util/strengthCalculations';

const EXERCISE_LABELS = {
  squat: '深蹲',
  bench: '臥推',
  deadlift: '硬舉',
  overheadPress: '過頭推舉',
  press: '過頭推舉'
};

export default function FiveThreeOneResults({ results }) {
  if (!results || !results.cycleData) {
    return null;
  }

  const { cycleData, chartData, startingMaxes, projectedMaxes, unit } = results;
  const exercises = Object.keys(chartData);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>訓練總結</CardTitle>
          <CardDescription>
            {cycleData.length} 個週期 • 每週期 4 週
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exercises.map(exercise => {
              const startMax = startingMaxes[exercise] || 0;
              const projectedMax = projectedMaxes[exercise] || 0;
              const totalGain = projectedMax - startMax;
              const percentGain = ((totalGain / startMax) * 100).toFixed(1);

              return (
                <div key={exercise} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">{EXERCISE_LABELS[exercise]}</h3>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      起始 1RM: {formatWeight(startMax, unit)}
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      預計 1RM: {formatWeight(projectedMax, unit)}
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
        title="訓練重量進程圖"
        programType="531"
      />

      {/* Cycle Breakdown */}
      <div className="space-y-6">
        {cycleData.map((cycle) => (
          <Card key={cycle.cycle}>
            <CardHeader>
              <CardTitle>Cycle {cycle.cycle}</CardTitle>
              <CardDescription>
                4 週訓練週期
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cycle.weeks.map((weekData) => (
                  <div key={weekData.week}>
                    <h3 className="font-semibold mb-3">{weekData.name}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[140px]">動作</TableHead>
                          <TableHead className="text-center">訓練最大值</TableHead>
                          <TableHead className="text-center" colSpan={3}>組數設定</TableHead>
                        </TableRow>
                        <TableRow>
                          <TableHead></TableHead>
                          <TableHead></TableHead>
                          <TableHead className="text-center text-xs">Set 1</TableHead>
                          <TableHead className="text-center text-xs">Set 2</TableHead>
                          <TableHead className="text-center text-xs">Set 3</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {exercises.map(exercise => {
                          const exerciseData = weekData.exercises[exercise];
                          return (
                            <TableRow key={exercise}>
                              <TableCell className="font-medium">
                                {EXERCISE_LABELS[exercise]}
                              </TableCell>
                              <TableCell className="text-center text-sm">
                                {formatWeight(exerciseData.trainingMax, unit)}
                              </TableCell>
                              {exerciseData.sets.map((set, idx) => (
                                <TableCell key={idx} className="text-center">
                                  <div className="space-y-1">
                                    <div className="font-semibold text-emerald-600">
                                      {formatWeight(set.weight, unit)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {set.reps} × {set.percent}%
                                    </div>
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notes Card */}
      <Card>
        <CardHeader>
          <CardTitle>訓練說明</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong>5/5/5+</strong>: 第一週，最後一組盡可能多做</li>
            <li><strong>3/3/3+</strong>: 第二週，最後一組盡可能多做</li>
            <li><strong>5/3/1+</strong>: 第三週，最後一組盡可能多做</li>
            <li><strong>Deload</strong>: 第四週減量週，恢復體力</li>
            <li>每組前建議做熱身組（使用較輕重量）</li>
            <li>「+」表示 AMRAP (As Many Reps As Possible)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
