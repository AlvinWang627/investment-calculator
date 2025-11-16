import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import FitnessResults from "../components/FitnessResults";
import { ACTIVITY_LEVELS, GOALS } from "../util/fitness";

export default function FitnessCalculator() {
  const [userData, setUserData] = useState({
    gender: "male",
    age: 30,
    height: 170,
    weight: 70,
    bodyFat: "",
    activityLevel: "moderate",
    goal: "maintain",
  });

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNumberChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: +value,
    }));
  };

  // Validation
  const validInput =
    userData.age >= 10 &&
    userData.age <= 120 &&
    userData.height >= 100 &&
    userData.height <= 250 &&
    userData.weight >= 30 &&
    userData.weight <= 300 &&
    (userData.bodyFat === "" || (userData.bodyFat >= 3 && userData.bodyFat <= 60));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          健身計算機
        </h1>
        <p className="text-muted-foreground">
          輸入您的個人資訊，計算 BMI、BMR/TDEE、FFMI、理想體重和營養素需求
        </p>
      </div>

      {/* Input Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>個人資訊</CardTitle>
          <CardDescription>請填寫您的基本資料以獲得準確的計算結果</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender */}
            <div className="space-y-3">
              <Label>性別</Label>
              <RadioGroup
                value={userData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="font-normal cursor-pointer">
                    男性
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="font-normal cursor-pointer">
                    女性
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">年齡 (歲)</Label>
              <Input
                id="age"
                type="number"
                value={userData.age}
                onChange={(e) => handleNumberChange("age", e.target.value)}
                min="10"
                max="120"
                required
              />
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label htmlFor="height">身高 (cm)</Label>
              <Input
                id="height"
                type="number"
                value={userData.height}
                onChange={(e) => handleNumberChange("height", e.target.value)}
                min="100"
                max="250"
                required
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight">體重 (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={userData.weight}
                onChange={(e) => handleNumberChange("weight", e.target.value)}
                min="30"
                max="300"
                step="0.1"
                required
              />
            </div>

            {/* Body Fat */}
            <div className="space-y-2">
              <Label htmlFor="bodyFat">體脂率 (%) - 選填</Label>
              <Input
                id="bodyFat"
                type="number"
                value={userData.bodyFat}
                onChange={(e) => handleNumberChange("bodyFat", e.target.value)}
                min="3"
                max="60"
                step="0.1"
                placeholder="若不知道可留空"
              />
              <p className="text-xs text-muted-foreground">
                填寫體脂率可計算 FFMI（去脂體重指數）
              </p>
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <Label htmlFor="activityLevel">活動量</Label>
              <Select
                value={userData.activityLevel}
                onValueChange={(value) => handleInputChange("activityLevel", value)}
              >
                <SelectTrigger id="activityLevel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ACTIVITY_LEVELS).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Goal */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="goal">目標</Label>
              <Select
                value={userData.goal}
                onValueChange={(value) => handleInputChange("goal", value)}
              >
                <SelectTrigger id="goal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(GOALS).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Error */}
      {!validInput && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            請檢查輸入值是否在合理範圍內：年齡 (10-120歲)、身高 (100-250cm)、體重 (30-300kg)、體脂率 (3-60% 或留空)
          </AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {validInput && <FitnessResults userData={userData} />}
    </div>
  );
}
