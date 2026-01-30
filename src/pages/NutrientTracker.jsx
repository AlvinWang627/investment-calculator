import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, RotateCcw, Save, Settings } from "lucide-react";
import { getNutrientGoals, saveNutrientGoals, getDailyIntake, saveDailyIntake, resetDailyIntake } from "../util/nutrientStorage";

export default function NutrientTracker() {
  const { t } = useTranslation();
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65
  });
  
  const [intake, setIntake] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [customEntry, setCustomEntry] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  });

  // Load data on mount
  useEffect(() => {
    setGoals(getNutrientGoals());
    setIntake(getDailyIntake());
  }, []);

  // Save intake whenever it changes
  useEffect(() => {
    saveDailyIntake(intake);
  }, [intake]);

  const handleGoalChange = (field, value) => {
    setGoals(prev => ({
      ...prev,
      [field]: Number(value)
    }));
  };

  const saveGoals = () => {
    saveNutrientGoals(goals);
    setIsEditingGoals(false);
  };

  const addIntake = (nutrients) => {
    setIntake(prev => ({
      calories: prev.calories + (nutrients.calories || 0),
      protein: prev.protein + (nutrients.protein || 0),
      carbs: prev.carbs + (nutrients.carbs || 0),
      fat: prev.fat + (nutrients.fat || 0)
    }));
  };

  const handleCustomEntryChange = (field, value) => {
    setCustomEntry(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitCustomEntry = (e) => {
    e.preventDefault();
    addIntake({
      calories: Number(customEntry.calories),
      protein: Number(customEntry.protein),
      carbs: Number(customEntry.carbs),
      fat: Number(customEntry.fat)
    });
    setCustomEntry({ calories: "", protein: "", carbs: "", fat: "" });
  };

  const handleReset = () => {
    if (confirm(t('nutrientTracker.confirmReset'))) {
      const resetData = resetDailyIntake();
      setIntake(resetData);
    }
  };

  // Helper for progress calculation
  const getProgress = (current, target) => {
    if (target === 0) return 0;
    const percentage = (current / target) * 100;
    return Math.min(percentage, 100);
  };

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage > 110) return "bg-red-500";
    if (percentage > 100) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            {t('nutrientTracker.title')}
          </h1>
          <p className="text-muted-foreground">{t('nutrientTracker.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditingGoals(!isEditingGoals)}>
            <Settings className="w-4 h-4 mr-2" />
            {t('nutrientTracker.setGoals')}
          </Button>
          <Button variant="outline" onClick={handleReset} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('nutrientTracker.resetDay')}
          </Button>
        </div>
      </div>

      {/* Goal Settings (Collapsible) */}
      {isEditingGoals && (
        <Card className="mb-8 border-green-200 bg-green-50/30">
          <CardHeader>
            <CardTitle className="text-lg">{t('nutrientTracker.dailyGoals')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>{t('fitnessCalc.results.tdee')} (kcal)</Label>
                <Input 
                  type="number" 
                  value={goals.calories} 
                  onChange={(e) => handleGoalChange("calories", e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label>{t('fitnessCalc.results.protein')} (g)</Label>
                <Input 
                  type="number" 
                  value={goals.protein} 
                  onChange={(e) => handleGoalChange("protein", e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label>{t('fitnessCalc.results.carbs')} (g)</Label>
                <Input 
                  type="number" 
                  value={goals.carbs} 
                  onChange={(e) => handleGoalChange("carbs", e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label>{t('fitnessCalc.results.fat')} (g)</Label>
                <Input 
                  type="number" 
                  value={goals.fat} 
                  onChange={(e) => handleGoalChange("fat", e.target.value)} 
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={saveGoals} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                {t('nutrientTracker.saveGoals')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Main Calorie Progress */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-4xl font-bold text-slate-800">{intake.calories}</span>
                <span className="text-muted-foreground text-sm ml-2">/ {goals.calories} kcal</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-600">{t('nutrientTracker.remaining')}</div>
                <div className={`text-xl font-bold ${goals.calories - intake.calories < 0 ? 'text-red-500' : 'text-green-600'}`}>
                  {goals.calories - intake.calories}
                </div>
              </div>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${getProgressColor(intake.calories, goals.calories)}`} 
                style={{ width: `${getProgress(intake.calories, goals.calories)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Macro Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t('nutrientTracker.macros')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Protein */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{t('fitnessCalc.results.protein')}</span>
                <span>{intake.protein} / {goals.protein} g</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${getProgress(intake.protein, goals.protein)}%` }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{t('fitnessCalc.results.carbs')}</span>
                <span>{intake.carbs} / {goals.carbs} g</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 transition-all duration-500" 
                  style={{ width: `${getProgress(intake.carbs, goals.carbs)}%` }}
                />
              </div>
            </div>

            {/* Fat */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{t('fitnessCalc.results.fat')}</span>
                <span>{intake.fat} / {goals.fat} g</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-400 transition-all duration-500" 
                  style={{ width: `${getProgress(intake.fat, goals.fat)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Add Form */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t('nutrientTracker.quickAdd')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitCustomEntry} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">{t('fitnessCalc.results.tdee')} (kcal)</Label>
                  <Input 
                    type="number" 
                    placeholder="kcal" 
                    value={customEntry.calories}
                    onChange={(e) => handleCustomEntryChange("calories", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('fitnessCalc.results.protein')} (g)</Label>
                  <Input 
                    type="number" 
                    placeholder="g" 
                    value={customEntry.protein}
                    onChange={(e) => handleCustomEntryChange("protein", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('fitnessCalc.results.carbs')} (g)</Label>
                  <Input 
                    type="number" 
                    placeholder="g" 
                    value={customEntry.carbs}
                    onChange={(e) => handleCustomEntryChange("carbs", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('fitnessCalc.results.fat')} (g)</Label>
                  <Input 
                    type="number" 
                    placeholder="g" 
                    value={customEntry.fat}
                    onChange={(e) => handleCustomEntryChange("fat", e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                {t('nutrientTracker.addRecord')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" onClick={() => addIntake({ protein: 25, calories: 120 })}>
          {t('nutrientTracker.quickActions.whey')}
        </Button>
        <Button variant="outline" onClick={() => addIntake({ protein: 6, fat: 5, calories: 70 })}>
          {t('nutrientTracker.quickActions.egg')}
        </Button>
        <Button variant="outline" onClick={() => addIntake({ protein: 23, calories: 110 })}>
          {t('nutrientTracker.quickActions.chicken')}
        </Button>
        <Button variant="outline" onClick={() => addIntake({ carbs: 50, calories: 200 })}>
          {t('nutrientTracker.quickActions.rice')}
        </Button>
      </div>
    </div>
  );
}
