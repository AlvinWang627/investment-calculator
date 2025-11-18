import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Save, Trash2 } from 'lucide-react';
import PPLResults from '@/components/hypertrophy/PPLResults';
import { calculatePPLProgression } from '@/util/hypertrophyCalculations';
import { savePPLData, loadPPLData, clearProgramData } from '@/util/localStorage';

const DEFAULT_PUSH_EXERCISES = {
  benchPress: 60,
  overheadPress: 40,
  inclinePress: 50,
  lateralRaise: 10,
  tricepExtension: 25
};

const DEFAULT_PULL_EXERCISES = {
  deadlift: 80,
  barbellRow: 60,
  pullUp: 0, // bodyweight
  latPulldown: 40,
  bicepCurl: 20
};

const DEFAULT_LEG_EXERCISES = {
  squat: 80,
  legPress: 100,
  legCurl: 40,
  legExtension: 50,
  calfRaise: 60
};

export default function PushPullLegs() {
  const [formData, setFormData] = useState({
    weeks: 12,
    frequency: 6, // 6 days per week (PPL x 2)
    pushExercises: DEFAULT_PUSH_EXERCISES,
    pullExercises: DEFAULT_PULL_EXERCISES,
    legExercises: DEFAULT_LEG_EXERCISES,
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
    const savedData = loadPPLData();
    if (savedData) {
      setFormData({
        weeks: savedData.weeks || 12,
        frequency: savedData.frequency || 6,
        pushExercises: savedData.pushExercises || DEFAULT_PUSH_EXERCISES,
        pullExercises: savedData.pullExercises || DEFAULT_PULL_EXERCISES,
        legExercises: savedData.legExercises || DEFAULT_LEG_EXERCISES,
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
      setError('訓練週數必須在 1-52 週之間');
      return;
    }

    if (formData.sets < 1 || formData.sets > 10) {
      setError('組數必須在 1-10 組之間');
      return;
    }

    if (formData.repsMin < 1 || formData.repsMin > formData.repsMax) {
      setError('次數範圍設定不正確');
      return;
    }

    // Check if all exercises have valid weights
    const hasInvalidWeight = [
      ...Object.values(formData.pushExercises),
      ...Object.values(formData.pullExercises),
      ...Object.values(formData.legExercises)
    ].some(weight => weight < 0);

    if (hasInvalidWeight) {
      setError('所有動作的起始重量不能為負數');
      return;
    }

    // Calculate results using the hypertrophy calculation function
    const calculatedResults = calculatePPLProgression(formData);
    setResults(calculatedResults);
  };

  const handleSave = () => {
    const success = savePPLData({
      ...formData,
      results
    });

    if (success) {
      setSaveMessage('訓練計畫已儲存！');
      setTimeout(() => setSaveMessage(''), 3000);
    } else {
      setError('儲存失敗，請稍後再試');
    }
  };

  const handleClear = () => {
    if (confirm('確定要清除所有資料嗎？')) {
      clearProgramData('ppl');
      setFormData({
        weeks: 12,
        frequency: 6,
        pushExercises: DEFAULT_PUSH_EXERCISES,
        pullExercises: DEFAULT_PULL_EXERCISES,
        legExercises: DEFAULT_LEG_EXERCISES,
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
                {getExerciseName(key)}
                {key === 'pullUp' && ' (徒手)'}
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
          Push/Pull/Legs (PPL) 肌肥大課表
        </h1>
        <p className="text-muted-foreground">
          經典的推拉腿分化訓練，適合中高級訓練者，專注於肌肉增長和體能提升
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
            <CardTitle>基本設定</CardTitle>
            <CardDescription>
              設定訓練週數、頻率和重量單位
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weeks">訓練週數</Label>
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
                <Label htmlFor="frequency">每週訓練天數</Label>
                <select
                  id="frequency"
                  value={formData.frequency}
                  onChange={(e) => handleInputChange('frequency', parseInt(e.target.value))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="3">3 天 (PPL 各 1 次)</option>
                  <option value="6">6 天 (PPL 各 2 次)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sets">每個動作組數</Label>
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
                <Label htmlFor="reps">次數範圍</Label>
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
                <Label htmlFor="increment">漸進增重 ({formData.unit})</Label>
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
                <Label htmlFor="unit">重量單位</Label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="kg">公斤 (kg)</option>
                  <option value="lbs">磅 (lbs)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {renderExerciseInputs(
          'pushExercises',
          formData.pushExercises,
          '🔴 Push Day 起始重量',
          '胸部、肩部、三頭肌訓練動作'
        )}

        {renderExerciseInputs(
          'pullExercises',
          formData.pullExercises,
          '🔵 Pull Day 起始重量',
          '背部、二頭肌訓練動作'
        )}

        {renderExerciseInputs(
          'legExercises',
          formData.legExercises,
          '🟢 Leg Day 起始重量',
          '腿部訓練動作'
        )}

        <div className="flex gap-3 mb-8">
          <Button type="submit" size="lg" className="flex-1">
            生成訓練計畫
          </Button>
          {results && (
            <>
              <Button type="button" size="lg" variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                儲存
              </Button>
              <Button type="button" size="lg" variant="outline" onClick={handleClear}>
                <Trash2 className="mr-2 h-4 w-4" />
                清除
              </Button>
            </>
          )}
        </div>
      </form>

      {results && <PPLResults results={results} />}
    </div>
  );
}

function getExerciseName(key) {
  const names = {
    // Push
    benchPress: '臥推',
    overheadPress: '肩推',
    inclinePress: '上斜臥推',
    lateralRaise: '側平舉',
    tricepExtension: '三頭肌伸展',
    // Pull
    deadlift: '硬舉',
    barbellRow: '槓鈴划船',
    pullUp: '引體向上',
    latPulldown: '滑輪下拉',
    bicepCurl: '二頭彎舉',
    // Legs
    squat: '深蹲',
    legPress: '腿推',
    legCurl: '腿彎舉',
    legExtension: '腿伸展',
    calfRaise: '提踵'
  };
  return names[key] || key;
}
