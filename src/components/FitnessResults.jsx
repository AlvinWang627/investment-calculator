import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAllMetrics } from "../util/fitness";
import { Activity, Target, TrendingUp, Apple, Scale } from "lucide-react";

export default function FitnessResults({ userData }) {
  const results = calculateAllMetrics(userData);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">計算結果</h2>

      {/* BMI Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
            BMI (身體質量指數)
          </CardTitle>
          <CardDescription>Body Mass Index - 評估體重是否在健康範圍</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600">
                {results.bmi.value.toFixed(1)}
              </span>
              <span className={`text-xl font-semibold ${results.bmi.category.color}`}>
                {results.bmi.category.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{results.bmi.category.description}</p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">參考範圍</p>
                <p className="text-sm font-medium">18.5 - 24.0 (正常)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">您的 BMI</p>
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
            BMR & TDEE (代謝率)
          </CardTitle>
          <CardDescription>
            基礎代謝率和每日總消耗熱量
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                BMR (基礎代謝率)
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {results.bmr.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">大卡/天</p>
              <p className="text-xs text-muted-foreground mt-2">
                完全休息狀態下維持生命所需的最低熱量
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                TDEE (每日總消耗)
              </h3>
              <p className="text-3xl font-bold text-emerald-600">
                {results.tdee.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">大卡/天</p>
              <p className="text-xs text-muted-foreground mt-2">
                包含日常活動的總熱量消耗
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
            FFMI (去脂體重指數)
          </CardTitle>
          <CardDescription>
            Fat-Free Mass Index - 評估肌肉量多寡
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
                  {results.ffmi.category.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {results.ffmi.category.description}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {userData.gender === "male" ? "男性" : "女性"}參考範圍
                  </p>
                  <p className="text-sm font-medium">
                    {userData.gender === "male" ? "17-22 (正常-良好)" : "14-19 (正常-良好)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">您的 FFMI</p>
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
                    無法計算 FFMI
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    因體脂率未填寫，無法計算去脂體重指數。請在上方輸入您的體脂率以獲得 FFMI 數據。
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-sm mb-2">關於 FFMI</h4>
                <p className="text-xs text-muted-foreground">
                  FFMI (Fat-Free Mass Index) 是評估肌肉量的指標，需要體脂率數據才能計算。
                  {userData.gender === "male"
                    ? "男性正常範圍為 17-22，超過 25 通常代表優秀的肌肉量。"
                    : "女性正常範圍為 14-19，超過 21 通常代表優秀的肌肉量。"}
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
            理想體重範圍
          </CardTitle>
          <CardDescription>基於 BMI 18.5-24.0 的健康體重範圍</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">最低</p>
                <p className="text-2xl font-bold text-orange-600">
                  {results.idealWeight.min.toFixed(1)} kg
                </p>
              </div>
              <div className="text-2xl text-muted-foreground">-</div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">最高</p>
                <p className="text-2xl font-bold text-orange-600">
                  {results.idealWeight.max.toFixed(1)} kg
                </p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-1">您的體重</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold">{userData.weight} kg</p>
                {userData.weight < results.idealWeight.min && (
                  <span className="text-sm text-blue-600">
                    (低於理想範圍 {(results.idealWeight.min - userData.weight).toFixed(1)} kg)
                  </span>
                )}
                {userData.weight > results.idealWeight.max && (
                  <span className="text-sm text-orange-600">
                    (高於理想範圍 {(userData.weight - results.idealWeight.max).toFixed(1)} kg)
                  </span>
                )}
                {userData.weight >= results.idealWeight.min &&
                  userData.weight <= results.idealWeight.max && (
                    <span className="text-sm text-green-600">(在理想範圍內)</span>
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
            營養素建議
          </CardTitle>
          <CardDescription>
            根據您的目標 ({userData.goal === "cutting" ? "減重" : userData.goal === "bulking" ? "增重" : "維持"})
            計算的每日營養素需求
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Total Calories */}
            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">每日建議攝取熱量</p>
              <p className="text-4xl font-bold text-red-600">
                {results.macros.calories.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">大卡/天</p>
            </div>

            {/* Macronutrients Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Protein */}
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-2">蛋白質</p>
                <p className="text-3xl font-bold text-blue-600">{results.macros.protein}g</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {results.macros.proteinCalories} 大卡 ({((results.macros.proteinCalories / results.macros.calories) * 100).toFixed(0)}%)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  每公斤體重: {(results.macros.protein / userData.weight).toFixed(1)}g
                </p>
              </div>

              {/* Carbs */}
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-2">碳水化合物</p>
                <p className="text-3xl font-bold text-green-600">{results.macros.carbs}g</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {results.macros.carbCalories} 大卡 ({((results.macros.carbCalories / results.macros.calories) * 100).toFixed(0)}%)
                </p>
              </div>

              {/* Fat */}
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-2">脂肪</p>
                <p className="text-3xl font-bold text-yellow-600">{results.macros.fat}g</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {results.macros.fatCalories} 大卡 ({((results.macros.fatCalories / results.macros.calories) * 100).toFixed(0)}%)
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="pt-4 border-t space-y-2">
              <h4 className="font-semibold text-sm">營養建議說明</h4>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>蛋白質：每公斤體重 {(results.macros.protein / userData.weight).toFixed(1)}g，有助於肌肉生長與修復</li>
                <li>脂肪：約佔總熱量 27%，維持荷爾蒙平衡與細胞功能</li>
                <li>碳水化合物：剩餘熱量，提供運動與日常活動能量</li>
                <li className="mt-2 font-medium text-foreground">
                  {userData.goal === "cutting" && "減重期間建議熱量赤字 500 大卡/天，預估每週減重 0.5kg"}
                  {userData.goal === "bulking" && "增重期間建議熱量盈餘 300 大卡/天，預估每週增重 0.3kg"}
                  {userData.goal === "maintain" && "維持體重期間攝取與消耗平衡"}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
