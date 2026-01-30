import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MortgageInput from "../components/mortgage/MortgageInput";
import MortgageResults from "../components/mortgage/MortgageResults";
import MortgageSchedule from "../components/mortgage/MortgageSchedule";
import SavedParameters from "../components/mortgage/SavedParameters";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { calculateMortgageSchedule, calculateMortgageSummary } from "../util/mortgage";
import { getSavedParameters, saveParameters, deleteParameters } from "../util/mortgageStorage";

export default function MortgageCalculator() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const [userInput, setUserInput] = useState({
    loanAmount: 500, // 萬元
    annualRate: 2.5,
    loanTerm: 20,
    gracePeriod: 2,
    startYear: 2020,
    currentYear: currentYear,
  });

  const [savedItems, setSavedItems] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 載入已儲存的參數
  useEffect(() => {
    const loaded = getSavedParameters();
    setSavedItems(loaded);
  }, []);

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

  // 儲存參數
  function handleSave() {
    const success = saveParameters(userInput);
    if (success) {
      const updated = getSavedParameters();
      setSavedItems(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  }

  // 載入參數
  function handleLoad(parameters) {
    setUserInput(parameters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 刪除參數
  function handleDelete(id) {
    const success = deleteParameters(id);
    if (success) {
      const updated = getSavedParameters();
      setSavedItems(updated);
    }
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-8">
        {/* 頁面標題 */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            {t('mortgageCalc.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {t('mortgageCalc.subtitle')}
          </p>
        </div>

        {/* 輸入表單 */}
        <MortgageInput userInput={userInput} onChange={handleChange} onSave={handleSave} />

        {/* 儲存成功訊息 */}
        {saveSuccess && (
          <div className="max-w-4xl mx-auto px-4">
            <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-300">{t('mortgageCalc.saveSuccessTitle')}</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                {t('mortgageCalc.saveSuccessDesc')}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* 已儲存的參數 */}
        <SavedParameters
          savedItems={savedItems}
          onLoad={handleLoad}
          onDelete={handleDelete}
        />

        {/* 錯誤訊息 */}
        {!validInput && (
          <div className="max-w-4xl mx-auto px-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('mortgageCalc.invalidTitle')}</AlertTitle>
              <AlertDescription>
                {t('mortgageCalc.invalidDesc')}
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>{t('mortgageCalc.invalidConditions.loanAmount')}</li>
                  <li>{t('mortgageCalc.invalidConditions.rate')}</li>
                  <li>{t('mortgageCalc.invalidConditions.term')}</li>
                  <li>{t('mortgageCalc.invalidConditions.grace')}</li>
                  <li>{t('mortgageCalc.invalidConditions.startYear')}</li>
                  <li>{t('mortgageCalc.invalidConditions.currentYear')}</li>
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
