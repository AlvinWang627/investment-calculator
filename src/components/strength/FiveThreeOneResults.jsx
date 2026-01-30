import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProgressChart from './ProgressChart';
import { formatWeight } from '@/util/strengthCalculations';

export default function FiveThreeOneResults({ results }) {
  const { t } = useTranslation();

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
          <CardTitle>{t('workout.summary')}</CardTitle>
          <CardDescription>
            {t('workout.tipsContent.fiveThreeOneDesc', { cycles: cycleData.length })}
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
                  <h3 className="font-semibold text-sm mb-2">{t(`exercises.${exercise}`)}</h3>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {t('workout.start')} 1RM: {formatWeight(startMax, unit)}
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      {t('workout.end')} 1RM: {formatWeight(projectedMax, unit)}
                    </p>
                    <p className="text-xs text-teal-600">
                      {t('workout.gain')}: {formatWeight(totalGain, unit)} ({percentGain}%)
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
        title={t('workout.chartTitle')}
        programType="531"
      />

      {/* Cycle Breakdown */}
      <div className="space-y-6">
        {cycleData.map((cycle) => (
          <Card key={cycle.cycle}>
            <CardHeader>
              <CardTitle>{t('workout.cycle')} {cycle.cycle}</CardTitle>
              <CardDescription>
                {t('strength.fiveThreeOne.cycleDesc')}
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
                          <TableHead className="w-[140px]">{t('workout.exercise')}</TableHead>
                          <TableHead className="text-center">{t('workout.trainingMax')}</TableHead>
                          <TableHead className="text-center" colSpan={3}>{t('workout.sets')}</TableHead>
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
                                {t(`exercises.${exercise}`)}
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
          <CardTitle>{t('workout.tips')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong>5/5/5+</strong>: Week 1, last set AMRAP</li>
            <li><strong>3/3/3+</strong>: Week 2, last set AMRAP</li>
            <li><strong>5/3/1+</strong>: Week 3, last set AMRAP</li>
            <li><strong>Deload</strong>: Week 4, recovery</li>
            <li>Warm up before sets</li>
            <li>"+" means As Many Reps As Possible</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
