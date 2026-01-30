import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Save, Trash2 } from 'lucide-react';
import ExerciseInput from '@/components/strength/ExerciseInput';
import FiveThreeOneResults from '@/components/strength/FiveThreeOneResults';
import { calculate531Cycle } from '@/util/strengthCalculations';
import { save531Data, load531Data, clearProgramData } from '@/util/localStorage';

const DEFAULT_MAX_LIFTS = {
  squat: 100,
  bench: 80,
  deadlift: 120,
  press: 50
};

export default function FiveThreeOne() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    cycles: 4,
    maxLifts: DEFAULT_MAX_LIFTS,
    trainingMaxPercent: 90,
    increments: {
      upper: 2.5,
      lower: 5
    },
    unit: 'kg'
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // Load saved data on mount
  useEffect(() => {
    const savedData = load531Data();
    if (savedData) {
      setFormData({
        cycles: savedData.cycles || 4,
        maxLifts: savedData.maxLifts || DEFAULT_MAX_LIFTS,
        trainingMaxPercent: savedData.trainingMaxPercent || 90,
        increments: savedData.increments || { upper: 2.5, lower: 5 },
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
      maxLifts: {
        ...prev.maxLifts,
        [exercise]: value
      }
    }));
    setError('');
  };

  const handleIncrementChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      increments: {
        ...prev.increments,
        [type]: value
      }
    }));
    setError('');
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    setSaveMessage('');

    // Validation
    if (formData.cycles < 1 || formData.cycles > 12) {
      setError('訓練週期數必須在 1-12 之間'); // Could be moved to i18n
      return;
    }

    if (formData.trainingMaxPercent < 50 || formData.trainingMaxPercent > 100) {
      setError('訓練最大值百分比必須在 50-100% 之間'); // Could be moved to i18n
      return;
    }

    // Check if all exercises have valid weights
    const hasInvalidWeight = Object.values(formData.maxLifts).some(weight => weight <= 0);
    if (hasInvalidWeight) {
      setError(t('strength.fiveByFive.invalidWeights')); // Reusing key
      return;
    }

    // Calculate results
    const calculatedResults = calculate531Cycle(formData);
    setResults(calculatedResults);
  };

  const handleSave = () => {
    const success = save531Data({
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
      clearProgramData('531');
      setFormData({
        cycles: 4,
        maxLifts: DEFAULT_MAX_LIFTS,
        trainingMaxPercent: 90,
        increments: { upper: 2.5, lower: 5 },
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
          {t('strength.fiveThreeOne.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('strength.fiveThreeOne.subtitle')}
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
            <CardTitle>{t('strength.fiveThreeOne.settings')}</CardTitle>
            <CardDescription>
              {t('strength.fiveByFive.settingsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cycles">{t('strength.fiveThreeOne.cycles')}</Label>
                <Input
                  id="cycles"
                  type="number"
                  min="1"
                  max="12"
                  value={formData.cycles}
                  onChange={(e) => handleInputChange('cycles', parseInt(e.target.value) || 0)}
                  required
                />
                <p className="text-xs text-muted-foreground">{t('strength.fiveThreeOne.cycleDesc')}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingMaxPercent">{t('strength.fiveThreeOne.trainingMax')}</Label>
                <Input
                  id="trainingMaxPercent"
                  type="number"
                  min="50"
                  max="100"
                  value={formData.trainingMaxPercent}
                  onChange={(e) => handleInputChange('trainingMaxPercent', parseInt(e.target.value) || 0)}
                  required
                />
                <p className="text-xs text-muted-foreground">{t('strength.fiveThreeOne.trainingMaxDesc')}</p>
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
            <CardTitle>{t('strength.fiveThreeOne.oneRmSettings')}</CardTitle>
            <CardDescription>
              {t('strength.fiveThreeOne.oneRmDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.keys(formData.maxLifts).map(exercise => (
                <ExerciseInput
                  key={exercise}
                  exercise={exercise}
                  value={formData.maxLifts[exercise]}
                  onChange={handleExerciseChange}
                  unit={formData.unit}
                  isMaxWeight={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('strength.fiveThreeOne.increments')}</CardTitle>
            <CardDescription>
              {t('strength.fiveThreeOne.incrementsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="upperIncrement">{t('strength.fiveThreeOne.upper')} ({formData.unit})</Label>
                <Input
                  id="upperIncrement"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={formData.increments.upper}
                  onChange={(e) => handleIncrementChange('upper', parseFloat(e.target.value) || 0)}
                  required
                />
                <p className="text-xs text-muted-foreground">{t('strength.fiveThreeOne.upperDesc')}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lowerIncrement">{t('strength.fiveThreeOne.lower')} ({formData.unit})</Label>
                <Input
                  id="lowerIncrement"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={formData.increments.lower}
                  onChange={(e) => handleIncrementChange('lower', parseFloat(e.target.value) || 0)}
                  required
                />
                <p className="text-xs text-muted-foreground">{t('strength.fiveThreeOne.lowerDesc')}</p>
              </div>
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

      {results && <FiveThreeOneResults results={results} />}
    </div>
  );
}
