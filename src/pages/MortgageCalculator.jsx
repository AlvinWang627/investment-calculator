import { useState } from "react";
import MortgageInput from "../components/mortgage/MortgageInput";
import MortgageResults from "../components/mortgage/MortgageResults";
import MortgageSchedule from "../components/mortgage/MortgageSchedule";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { calculateMortgageSchedule, calculateMortgageSummary } from "../util/mortgage";

export default function MortgageCalculator() {
  const currentYear = new Date().getFullYear();

  const [userInput, setUserInput] = useState({
    loanAmount: 500, // 萬元
    annualRate: 2.5,
    loanTerm: 20,
    gracePeriod: 2,
    startYear: 2020,
    currentYear: currentYear,
  });

  // 輸入驗證
  const validInput =
    userInput.loanAmount > 0 &&
    userInput.annualRate > 0 &&
    userInput.loanTerm > 0 &&
    userInput.gracePeriod >= 0 &&
    userInput.gracePeriod < userInput.loanTerm &&
    userInput.startYear > 1900 &&
    userInput.currentYear >= userInput.startYear &&
    userInput.currentYear <= userInput.startYear + userInput.loanTerm;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  // 計算結果
  let schedule = [];
  let summary = null;

  if (validInput) {
    // 將萬元轉換為實際金額
    const actualLoanAmount = userInput.loanAmount * 10000;
    const calculationInput = {
      ...userInput,
      loanAmount: actualLoanAmount,
    };
    schedule = calculateMortgageSchedule(calculationInput);
    summary = calculateMortgageSummary(schedule, actualLoanAmount, userInput.currentYear);
  }

  return (
    <div className="mortgage-calculator-page">
      <div className="space-y-8">
        {/* 頁面標題 */}
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            房貸計算機
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            計算您的房貸還款計劃，包含寬限期選項
          </p>
        </div>

        {/* 輸入表單 */}
        <MortgageInput userInput={userInput} onChange={handleChange} />

        {/* 錯誤訊息 */}
        {!validInput && (
          <div className="max-w-4xl mx-auto px-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>無效輸入</AlertTitle>
              <AlertDescription>
                請檢查以下條件：
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>房貸總額必須大於 0</li>
                  <li>利率必須大於 0</li>
                  <li>貸款年數必須大於 0</li>
                  <li>寬限期必須小於貸款年數</li>
                  <li>開始年份必須大於 1900</li>
                  <li>目前年份必須在貸款期間內</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* 結果顯示 */}
        {validInput && summary && (
          <>
            <MortgageResults summary={summary} userInput={userInput} />
            <MortgageSchedule schedule={schedule} />
          </>
        )}
      </div>
    </div>
  );
}
