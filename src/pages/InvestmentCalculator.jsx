import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import UserInput from "../components/UserInput";
import Results from "../components/Results";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function InvestmentCalculator() {
  const { t } = useTranslation();
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  const validInput = userInput.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-8">
        <Header />
        <UserInput userInput={userInput} onChange={handleChange} />
        {!validInput && (
          <div className="max-w-4xl mx-auto px-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('investmentCalc.invalidTitle')}</AlertTitle>
              <AlertDescription>
                {t('investmentCalc.invalidDesc')}
              </AlertDescription>
            </Alert>
          </div>
        )}
        {validInput && <Results input={userInput} />}
      </div>
    </div>
  );
}
