import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserInput({ userInput, onChange }) {
  const { t } = useTranslation();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{t('investmentCalc.parameters')}</CardTitle>
          <CardDescription>
            {t('investmentCalc.parametersDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">{t('investmentCalc.initialInvestment')}</Label>
              <Input
                id="initialInvestment"
                type="number"
                required
                value={userInput.initialInvestment}
                onChange={(event) =>
                  onChange("initialInvestment", event.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualInvestment">{t('investmentCalc.annualInvestment')}</Label>
              <Input
                id="annualInvestment"
                type="number"
                required
                value={userInput.annualInvestment}
                onChange={(event) =>
                  onChange("annualInvestment", event.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedReturn">{t('investmentCalc.expectedReturn')}</Label>
              <Input
                id="expectedReturn"
                type="number"
                required
                value={userInput.expectedReturn}
                onChange={(event) => onChange("expectedReturn", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">{t('investmentCalc.duration')}</Label>
              <Input
                id="duration"
                type="number"
                required
                value={userInput.duration}
                onChange={(event) => onChange("duration", event.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
