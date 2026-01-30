import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Save, Trash2 } from 'lucide-react';
import ExerciseInput from '@/components/strength/ExerciseInput';
import FiveByFiveResults from '@/components/strength/FiveByFiveResults';
import { calculate5x5Progression } from '@/util/strengthCalculations';
import { save5x5Data, load5x5Data, clearProgramData } from '@/util/localStorage';

const DEFAULT_EXERCISES = {
  squat: 60,
  bench: 40,
  deadlift: 80,
  overheadPress: 30,
  row: 50
};

export default function FiveByFive() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    weeks: 12,
    exercises: DEFAULT_EXERCISES,
    increment: 2.5,
    deloadPercent: 10,
    unit: 'kg'
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // Load saved data on mount
  useEffect(() => {
    const savedData = load5x5Data();
    if (savedData) {
      setFormData({
        weeks: savedData.weeks || 12,
        exercises: savedData.exercises || DEFAULT_EXERCISES,
        increment: savedData.increment || 2.5,
        deloadPercent: savedData.deloadPercent || 10,
        unit: savedData.unit || 'kg'
      });
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleExerciseChange = (exercise, value) => {
    setFormData(prev => ({
      ...prev,
      exercises: {
        ...prev.exercises,
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
      setError(t('strength.fiveByFive.invalidWeeks'));
      return;
    }

    if (formData.increment <= 0) {
      setError(t('strength.fiveByFive.invalidIncrement'));
      return;
    }

    // Check if all exercises have valid weights
    const hasInvalidWeight = Object.values(formData.exercises).some(weight => weight <= 0);
    if (hasInvalidWeight) {
      setError(t('strength.fiveByFive.invalidWeights'));
      return;
    }

    // Calculate results
    const calculatedResults = calculate5x5Progression(formData);
    setResults(calculatedResults);
  };

  const handleSave = () => {
    const success = save5x5Data({
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
      clearProgramData('5x5');
      setFormData({
        weeks: 12,
        exercises: DEFAULT_EXERCISES,
        increment: 2.5,
        deloadPercent: 10,
        unit: 'kg'
      });
      setResults(null);
      setError('');
      setSaveMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('strength.fiveByFive.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('strength.fiveByFive.subtitle')}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('strength.fiveByFive.startWeights')}</CardTitle>
            <CardDescription>
              {t('strength.fiveByFive.startWeightsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(formData.exercises).map(exercise => (
                <ExerciseInput
                  key={exercise}
                  exercise={exercise}
                  value={formData.exercises[exercise]}
                  onChange={handleExerciseChange}
                  unit={formData.unit}
                />
              ))}
            </div>
          </CardContent>
        </Card>

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

      {results && <FiveByFiveResults results={results} />}
    </div>
  );
}
