import { useState, useEffect } from 'react';
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
      setError('訓練週期數必須在 1-12 之間');
      return;
    }

    if (formData.trainingMaxPercent < 50 || formData.trainingMaxPercent > 100) {
      setError('訓練最大值百分比必須在 50-100% 之間');
      return;
    }

    // Check if all exercises have valid weights
    const hasInvalidWeight = Object.values(formData.maxLifts).some(weight => weight <= 0);
    if (hasInvalidWeight) {
      setError('所有動作的 1RM 必須大於 0');
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
      setSaveMessage('訓練計畫已儲存！');
      setTimeout(() => setSaveMessage(''), 3000);
    } else {
      setError('儲存失敗，請稍後再試');
    }
  };

  const handleClear = () => {
    if (confirm('確定要清除所有資料嗎？')) {
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
          5/3/1 力量訓練課表
        </h1>
        <p className="text-muted-foreground">
          Jim Wendler 的 5/3/1 訓練系統，基於週期化漸進訓練原則
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
              設定訓練週期數和重量單位
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cycles">訓練週期數</Label>
                <Input
                  id="cycles"
                  type="number"
                  min="1"
                  max="12"
                  value={formData.cycles}
                  onChange={(e) => handleInputChange('cycles', parseInt(e.target.value) || 0)}
                  required
                />
                <p className="text-xs text-muted-foreground">每週期 4 週</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingMaxPercent">訓練最大值百分比 (%)</Label>
                <Input
                  id="trainingMaxPercent"
                  type="number"
                  min="50"
                  max="100"
                  value={formData.trainingMaxPercent}
                  onChange={(e) => handleInputChange('trainingMaxPercent', parseInt(e.target.value) || 0)}
                  required
                />
                <p className="text-xs text-muted-foreground">建議 85-90%</p>
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1RM 最大重量設定</CardTitle>
            <CardDescription>
              輸入每個動作的單次最大重量（1RM）
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
            <CardTitle>週期增量設定</CardTitle>
            <CardDescription>
              每完成一個週期後增加的重量
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="upperIncrement">上肢動作增量 ({formData.unit})</Label>
                <Input
                  id="upperIncrement"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={formData.increments.upper}
                  onChange={(e) => handleIncrementChange('upper', parseFloat(e.target.value) || 0)}
                  required
                />
                <p className="text-xs text-muted-foreground">臥推、過頭推舉</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lowerIncrement">下肢動作增量 ({formData.unit})</Label>
                <Input
                  id="lowerIncrement"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={formData.increments.lower}
                  onChange={(e) => handleIncrementChange('lower', parseFloat(e.target.value) || 0)}
                  required
                />
                <p className="text-xs text-muted-foreground">深蹲、硬舉</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 mb-8">
          <Button type="submit" size="lg" className="flex-1">
            計算訓練計畫
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

      {results && <FiveThreeOneResults results={results} />}
    </div>
  );
}
