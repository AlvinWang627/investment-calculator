import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProgressChart from './ProgressChart';
import { formatWeight } from '@/util/strengthCalculations';

export default function FiveByFiveResults({ results }) {
  const { t } = useTranslation();

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
          <CardTitle>{t('workout.summary')}</CardTitle>
          <CardDescription>
            {t('workout.tipsContent.fiveByFiveDesc', { weeks: weeklyData.length })}
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
                  <h3 className="font-semibold text-sm mb-2">{t(`exercises.${exercise}`)}</h3>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {t('workout.start')}: {formatWeight(startWeight, unit)}
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      {t('workout.end')}: {formatWeight(endWeight, unit)}
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
        programType="5x5"
      />

      {/* Weekly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>{t('workout.weeklyBreakdown')}</CardTitle>
          <CardDescription>
            {t('mortgageCalc.scheduleDesc', { months: weeklyData.length }).replace('months', 'weeks')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {weeklyData.map((weekData) => (
              <div key={weekData.week}>
                <h3 className="font-semibold mb-3 text-lg">{t('workout.week')} {weekData.week}</h3>
                <div className="space-y-4">
                  {weekData.sessions.map((sessionData) => (
                    <div key={sessionData.session} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-sm text-muted-foreground">
                        {t('workout.session')} {sessionData.session}
                      </h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[140px]">{t('workout.exercise')}</TableHead>
                            <TableHead className="text-right">{t('workout.weight')}</TableHead>
                            <TableHead className="text-center">{t('workout.sets')}</TableHead>
                            <TableHead className="text-center">{t('workout.reps')}</TableHead>
                            <TableHead className="text-right">{t('workout.volume')}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {exercises.map(exercise => {
                            const exerciseData = sessionData.exercises[exercise];
                            return (
                              <TableRow key={exercise}>
                                <TableCell className="font-medium">
                                  {t(`exercises.${exercise}`)}
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
