import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Save, Trash2 } from 'lucide-react';
import UpperLowerResults from '@/components/hypertrophy/UpperLowerResults';
import { calculateUpperLowerProgression } from '@/util/hypertrophyCalculations';
import { saveUpperLowerData, loadUpperLowerData, clearProgramData } from '@/util/localStorage';

const DEFAULT_UPPER_EXERCISES = {
  benchPress: 60,
  barbellRow: 60,
  overheadPress: 40,
  pullUp: 0, // bodyweight
  inclinePress: 50,
  cableRow: 50,
  lateralRaise: 10,
  bicepCurl: 20,
  tricepExtension: 25
};

const DEFAULT_LOWER_EXERCISES = {
  squat: 80,
  romanianDeadlift: 70,
  legPress: 100,
  legCurl: 40,
  legExtension: 50,
  lunges: 40,
  calfRaise: 60,
  hipThrust: 60
};

export default function UpperLowerSplit() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    weeks: 12,
    frequency: 4, // 4 days per week (Upper x2, Lower x2)
    upperExercises: DEFAULT_UPPER_EXERCISES,
    lowerExercises: DEFAULT_LOWER_EXERCISES,
    sets: 3,
    repsMin: 8,
    repsMax: 12,
    increment: 2.5,
    unit: 'kg'
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadUpperLowerData();
    if (savedData) {
      setFormData({
        weeks: savedData.weeks || 12,
        frequency: savedData.frequency || 4,
        upperExercises: savedData.upperExercises || DEFAULT_UPPER_EXERCISES,
        lowerExercises: savedData.lowerExercises || DEFAULT_LOWER_EXERCISES,
        sets: savedData.sets || 3,
        repsMin: savedData.repsMin || 8,
        repsMax: savedData.repsMax || 12,
        increment: savedData.increment || 2.5,
        unit: savedData.unit || 'kg'
      });
      // If results were saved, display them immediately
      if (savedData.results) {
        setResults(savedData.results);
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleExerciseChange = (category, exercise, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [exercise]: value
      }
    }));
    setError('');
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    setSaveMessage('');

    // Validation
    if (formData.weeks < 1 || formData.weeks > 52) {
      setError(t('strength.fiveByFive.invalidWeeks')); // Reuse key
      return;
    }

    if (formData.sets < 1 || formData.sets > 10) {
      setError('組數必須在 1-10 組之間'); // i18n
      return;
    }

    if (formData.repsMin < 1 || formData.repsMin > formData.repsMax) {
      setError('次數範圍設定不正確'); // i18n
      return;
    }

    // Check if all exercises have valid weights
    const hasInvalidWeight = [
      ...Object.values(formData.upperExercises),
      ...Object.values(formData.lowerExercises)
    ].some(weight => weight < 0);

    if (hasInvalidWeight) {
      setError('所有動作的起始重量不能為負數'); // i18n
      return;
    }

    // Calculate results using the hypertrophy calculation function
    const calculatedResults = calculateUpperLowerProgression(formData);
    setResults(calculatedResults);
  };

  const handleSave = () => {
    const success = saveUpperLowerData({
      ...formData,
      results
    });

    if (success) {
      setSaveMessage(t('strength.fiveByFive.saved'));
      setTimeout(() => setSaveMessage(''), 3000);
    } else {
      setError(t('strength.fiveByFive.saveError'));
    }
  };

  const handleClear = () => {
    if (confirm(t('strength.fiveByFive.confirmClear'))) {
      clearProgramData('upperLower');
      setFormData({
        weeks: 12,
        frequency: 4,
        upperExercises: DEFAULT_UPPER_EXERCISES,
        lowerExercises: DEFAULT_LOWER_EXERCISES,
        sets: 3,
        repsMin: 8,
        repsMax: 12,
        increment: 2.5,
        unit: 'kg'
      });
      setResults(null);
      setError('');
      setSaveMessage('');
    }
  };

  const renderExerciseInputs = (category, exercises, title, description) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(exercises).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>
                {t(`exercises.${key}`, key)}
                {key === 'pullUp' && ' (Bodyweight)'}
              </Label>
              <div className="relative">
                <Input
                  id={key}
                  type="number"
                  step="0.5"
                  min="0"
                  value={value}
                  onChange={(e) => handleExerciseChange(category, key, parseFloat(e.target.value) || 0)}
                  required={key !== 'pullUp'}
                />
                {key !== 'pullUp' && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {formData.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('hypertrophy.upperLower.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('hypertrophy.upperLower.subtitle')}
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {saveMessage && (
        <Alert className="mb-6 border-green-500 bg-green-50 text-green-900">
          <AlertDescription>{saveMessage}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleCalculate}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('strength.fiveByFive.settings')}</CardTitle>
            <CardDescription>
              {t('strength.fiveByFive.settingsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weeks">{t('strength.fiveByFive.weeks')}</Label>
                <Input
                  id="weeks"
                  type="number"
                  min="1"
                  max="52"
                  value={formData.weeks}
                  onChange={(e) => handleInputChange('weeks', parseInt(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">{t('hypertrophy.ppl.frequency')}</Label>
                <select
                  id="frequency"
                  value={formData.frequency}
                  onChange={(e) => handleInputChange('frequency', parseInt(e.target.value))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="4">4 {t('hypertrophy.ppl.daysPerWeek', { days: '' })} (Upper x 2, Lower x 2)</option>
                  <option value="2">2 {t('hypertrophy.ppl.daysPerWeek', { days: '' })} (Upper x 1, Lower x 1)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sets">{t('hypertrophy.ppl.sets')}</Label>
                <Input
                  id="sets"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.sets}
                  onChange={(e) => handleInputChange('sets', parseInt(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reps">{t('hypertrophy.ppl.reps')}</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="repsMin"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.repsMin}
                    onChange={(e) => handleInputChange('repsMin', parseInt(e.target.value) || 0)}
                    required
                    className="w-20"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    id="repsMax"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.repsMax}
                    onChange={(e) => handleInputChange('repsMax', parseInt(e.target.value) || 0)}
                    required
                    className="w-20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="increment">{t('strength.fiveByFive.increment')} ({formData.unit})</Label>
                <Input
                  id="increment"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={formData.increment}
                  onChange={(e) => handleInputChange('increment', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">{t('strength.fiveByFive.unit')}</Label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {renderExerciseInputs(
          'upperExercises',
          formData.upperExercises,
          t('hypertrophy.upperLower.upperTitle'),
          t('hypertrophy.upperLower.upperDesc')
        )}

        {renderExerciseInputs(
          'lowerExercises',
          formData.lowerExercises,
          t('hypertrophy.upperLower.lowerTitle'),
          t('hypertrophy.upperLower.lowerDesc')
        )}

        <div className="flex gap-3 mb-8">
          <Button type="submit" size="lg" className="flex-1">
            {t('strength.fiveByFive.calculate')}
          </Button>
          {results && (
            <>
              <Button type="button" size="lg" variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                {t('strength.fiveByFive.save')}
              </Button>
              <Button type="button" size="lg" variant="outline" onClick={handleClear}>
                <Trash2 className="mr-2 h-4 w-4" />
                {t('strength.fiveByFive.clear')}
              </Button>
            </>
          )}
        </div>
      </form>

      {results && <UpperLowerResults results={results} />}
    </div>
  );
}
