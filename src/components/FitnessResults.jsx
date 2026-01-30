import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAllMetrics } from "../util/fitness";
import { Activity, Target, TrendingUp, Apple, Scale, AlertCircle } from "lucide-react";

export default function FitnessResults({ userData }) {
  const { t } = useTranslation();
  const results = calculateAllMetrics(userData);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('fitnessCalc.results.title')}</h2>

      {/* BMI Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
            {t('fitnessCalc.results.bmiTitle')}
          </CardTitle>
          <CardDescription>{t('fitnessCalc.results.bmiDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600">
                {results.bmi.value.toFixed(1)}
              </span>
              <span className={`text-xl font-semibold ${results.bmi.category.color}`}>
                {t(`fitnessCalc.results.bmiCategories.${results.bmi.category.categoryKey}`)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t(`fitnessCalc.results.bmiDescriptions.${results.bmi.category.categoryKey}`)}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">{t('fitnessCalc.results.referenceRange')}</p>
                <p className="text-sm font-medium">{t('fitnessCalc.results.normal')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('fitnessCalc.results.yourBmi')}</p>
                <p className="text-sm font-medium">{results.bmi.value.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BMR & TDEE Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            {t('fitnessCalc.results.bmrTdeeTitle')}
          </CardTitle>
          <CardDescription>
            {t('fitnessCalc.results.bmrTdeeDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('fitnessCalc.results.bmr')}
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {results.bmr.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">{t('fitnessCalc.results.bmrUnit')}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {t('fitnessCalc.results.bmrDesc')}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('fitnessCalc.results.tdee')}
              </h3>
              <p className="text-3xl font-bold text-emerald-600">
                {results.tdee.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">{t('fitnessCalc.results.tdeeUnit')}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {t('fitnessCalc.results.tdeeDesc')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FFMI Card - Always show */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            {t('fitnessCalc.results.ffmiTitle')}
          </CardTitle>
          <CardDescription>
            {t('fitnessCalc.results.ffmiDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results.ffmi ? (
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-purple-600">
                  {results.ffmi.value.toFixed(1)}
                </span>
                <span className={`text-xl font-semibold ${results.ffmi.category.color}`}>
                  {t(`fitnessCalc.results.ffmiCategories.${results.ffmi.category.categoryKey}`)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t(`fitnessCalc.results.ffmiDescriptions.${results.ffmi.category.categoryKey}`)}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {userData.gender === "male" ? t('fitnessCalc.results.ffmiMaleRef') : t('fitnessCalc.results.ffmiFemaleRef')}
                  </p>
                  <p className="text-sm font-medium">
                    {userData.gender === "male" ? "17-22 (Normal-Good)" : "14-19 (Normal-Good)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('fitnessCalc.results.yourFfmi')}</p>
                  <p className="text-sm font-medium">{results.ffmi.value.toFixed(1)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    {t('fitnessCalc.results.noFfmi')}
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    {t('fitnessCalc.results.noFfmiDesc')}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-sm mb-2">{t('fitnessCalc.results.ffmiInfoTitle')}</h4>
                <p className="text-xs text-muted-foreground">
                  {t('fitnessCalc.results.ffmiInfo')}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ideal Weight Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-600" />
            {t('fitnessCalc.results.idealWeightTitle')}
          </CardTitle>
          <CardDescription>{t('fitnessCalc.results.idealWeightDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{t('fitnessCalc.results.min')}</p>
                <p className="text-2xl font-bold text-orange-600">
                  {results.idealWeight.min.toFixed(1)} kg
                </p>
              </div>
              <div className="text-2xl text-muted-foreground">-</div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{t('fitnessCalc.results.max')}</p>
                <p className="text-2xl font-bold text-orange-600">
                  {results.idealWeight.max.toFixed(1)} kg
                </p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-1">{t('fitnessCalc.results.yourWeight')}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold">{userData.weight} kg</p>
                {userData.weight < results.idealWeight.min && (
                  <span className="text-sm text-blue-600">
                    {t('fitnessCalc.results.belowRange', { diff: (results.idealWeight.min - userData.weight).toFixed(1) })}
                  </span>
                )}
                {userData.weight > results.idealWeight.max && (
                  <span className="text-sm text-orange-600">
                    {t('fitnessCalc.results.aboveRange', { diff: (userData.weight - results.idealWeight.max).toFixed(1) })}
                  </span>
                )}
                {userData.weight >= results.idealWeight.min &&
                  userData.weight <= results.idealWeight.max && (
                    <span className="text-sm text-green-600">{t('fitnessCalc.results.inRange')}</span>
                  )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macros Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="h-5 w-5 text-red-600" />
            {t('fitnessCalc.results.macrosTitle')}
          </CardTitle>
          <CardDescription>
            {t('fitnessCalc.results.macrosDesc', { goal: t(`fitnessCalc.goals.${userData.goal}`) })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Total Calories */}
            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t('fitnessCalc.results.dailyCalories')}</p>
              <p className="text-4xl font-bold text-red-600">
                {results.macros.calories.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{t('fitnessCalc.results.tdeeUnit')}</p>
            </div>

            {/* Macronutrients Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Protein */}
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-2">{t('fitnessCalc.results.protein')}</p>
                <p className="text-3xl font-bold text-blue-600">{results.macros.protein}g</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {results.macros.proteinCalories} kcal ({((results.macros.proteinCalories / results.macros.calories) * 100).toFixed(0)}%)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('fitnessCalc.results.perKg', { amount: (results.macros.protein / userData.weight).toFixed(1) })}
                </p>
              </div>

              {/* Carbs */}
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-2">{t('fitnessCalc.results.carbs')}</p>
                <p className="text-3xl font-bold text-green-600">{results.macros.carbs}g</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {results.macros.carbCalories} kcal ({((results.macros.carbCalories / results.macros.calories) * 100).toFixed(0)}%)
                </p>
              </div>

              {/* Fat */}
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-2">{t('fitnessCalc.results.fat')}</p>
                <p className="text-3xl font-bold text-yellow-600">{results.macros.fat}g</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {results.macros.fatCalories} kcal ({((results.macros.fatCalories / results.macros.calories) * 100).toFixed(0)}%)
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="pt-4 border-t space-y-2">
              <h4 className="font-semibold text-sm">{t('fitnessCalc.results.notesTitle')}</h4>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>{t('fitnessCalc.results.proteinNote', { amount: (results.macros.protein / userData.weight).toFixed(1) })}</li>
                <li>{t('fitnessCalc.results.fatNote')}</li>
                <li>{t('fitnessCalc.results.carbsNote')}</li>
                <li className="mt-2 font-medium text-foreground">
                  {userData.goal === "cutting" && t('fitnessCalc.results.cuttingNote')}
                  {userData.goal === "bulking" && t('fitnessCalc.results.bulkingNote')}
                  {userData.goal === "maintain" && t('fitnessCalc.results.maintainNote')}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
