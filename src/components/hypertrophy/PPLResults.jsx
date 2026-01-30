import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatWeight } from '@/util/hypertrophyCalculations';

export default function PPLResults({ results }) {
  const { t } = useTranslation();

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
          <CardTitle>{t('workout.summary')}</CardTitle>
          <CardDescription>
            {t('workout.tipsContent.pplDesc', {
              weeks: weeklyData.length,
              freq: frequency,
              sets: sets,
              min: repsMin,
              max: repsMax
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Push Day Summary */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">{t('workout.pushProgress')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {pushStats.map(({ exercise, startWeight, endWeight, totalGain, percentGain }) => (
                <div key={exercise} className="p-4 border rounded-lg bg-red-50/50 dark:bg-red-950/20">
                  <h4 className="font-semibold text-sm mb-2">{t(`exercises.${exercise}`)}</h4>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {t('workout.start')}: {formatWeight(startWeight, unit)}
                    </p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-500">
                      {t('workout.end')}: {formatWeight(endWeight, unit)}
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-400">
                      {t('workout.gain')}: {formatWeight(totalGain, unit)} ({percentGain}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pull Day Summary */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">{t('workout.pullProgress')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {pullStats.map(({ exercise, startWeight, endWeight, totalGain, percentGain }) => (
                <div key={exercise} className="p-4 border rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                  <h4 className="font-semibold text-sm mb-2">{t(`exercises.${exercise}`)}</h4>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {t('workout.start')}: {formatWeight(startWeight, unit)}
                    </p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-500">
                      {t('workout.end')}: {formatWeight(endWeight, unit)}
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      {t('workout.gain')}: {formatWeight(totalGain, unit)} ({percentGain}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leg Day Summary */}
          <div>
            <h3 className="font-semibold text-lg mb-3">{t('workout.legProgress')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {legStats.map(({ exercise, startWeight, endWeight, totalGain, percentGain }) => (
                <div key={exercise} className="p-4 border rounded-lg bg-green-50/50 dark:bg-green-950/20">
                  <h4 className="font-semibold text-sm mb-2">{t(`exercises.${exercise}`)}</h4>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {t('workout.start')}: {formatWeight(startWeight, unit)}
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-500">
                      {t('workout.end')}: {formatWeight(endWeight, unit)}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-400">
                      {t('workout.gain')}: {formatWeight(totalGain, unit)} ({percentGain}%)
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
          <CardTitle>{t('workout.weeklyBreakdown')}</CardTitle>
          <CardDescription>
            {t('mortgageCalc.scheduleDesc', { months: weeklyData.length }).replace('months', 'weeks')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {weeklyData.map((weekData) => (
              <div key={weekData.week} className="border-b pb-6 last:border-b-0">
                <h3 className="font-semibold mb-4 text-lg">{t('workout.week')} {weekData.week}</h3>
                <div className="space-y-4">
                  {weekData.sessions.map((sessionData) => {
                    const sessionColor = sessionData.type === 'push' ? 'red'
                      : sessionData.type === 'pull' ? 'blue'
                      : 'green';

                    return (
                      <div key={sessionData.session} className={`border rounded-lg p-4 bg-${sessionColor}-50/30 dark:bg-${sessionColor}-950/10`}>
                        <h4 className="font-medium mb-3 text-sm">
                          {t('workout.session')} {sessionData.session} - {t(`workout.${sessionData.type}Day`)}
                        </h4>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[160px]">{t('workout.exercise')}</TableHead>
                                <TableHead className="text-right">{t('workout.weight')}</TableHead>
                                <TableHead className="text-center">{t('workout.sets')}</TableHead>
                                <TableHead className="text-center">{t('workout.reps')}</TableHead>
                                <TableHead className="text-center">{t('hypertrophy.ppl.reps')}</TableHead>
                                <TableHead className="text-right">{t('workout.volume')}</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Object.keys(sessionData.exercises).map(exercise => {
                                const exerciseData = sessionData.exercises[exercise];
                                return (
                                  <TableRow key={exercise}>
                                    <TableCell className="font-medium">
                                      {t(`exercises.${exercise}`)}
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
          <CardTitle>{t('workout.tips')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>{t('workout.progressiveOverload')}: </strong>
              {t('workout.tipsContent.progressiveOverloadPPL', {
                max: repsMax,
                min: repsMin,
                increment: formatWeight(results.chartData.push[Object.keys(results.chartData.push)[0]][0]?.weight || 2.5, unit).split(' ')[1] // This logic is a bit brittle, just getting unit basically, but keeping consistent with original
              })}
            </p>
            <p>
              <strong>{t('workout.restTime')}: </strong>{t('workout.tipsContent.restTimeDesc')}
            </p>
            <p>
              <strong>{t('workout.frequency')}: </strong>{t('workout.tipsContent.frequencyPPL', { freq: frequency })}
            </p>
            <p>
              <strong>{t('workout.technique')}: </strong>{t('workout.tipsContent.techniqueDesc')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
