import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function MortgageInput({ userInput, onChange, onSave }) {
  const { t } = useTranslation();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{t('mortgageCalc.parameters')}</CardTitle>
          <CardDescription>
            {t('mortgageCalc.parametersDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">{t('mortgageCalc.loanAmount')}</Label>
              <Input
                id="loanAmount"
                type="number"
                required
                value={userInput.loanAmount}
                onChange={(event) =>
                  onChange("loanAmount", event.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualRate">{t('mortgageCalc.annualRate')}</Label>
              <Input
                id="annualRate"
                type="number"
                step="0.01"
                required
                value={userInput.annualRate}
                onChange={(event) =>
                  onChange("annualRate", event.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTerm">{t('mortgageCalc.loanTerm')}</Label>
              <Input
                id="loanTerm"
                type="number"
                required
                value={userInput.loanTerm}
                onChange={(event) => onChange("loanTerm", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gracePeriod">{t('mortgageCalc.gracePeriod')}</Label>
              <Input
                id="gracePeriod"
                type="number"
                required
                value={userInput.gracePeriod}
                onChange={(event) => onChange("gracePeriod", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startYear">{t('mortgageCalc.startYear')}</Label>
              <Input
                id="startYear"
                type="number"
                required
                value={userInput.startYear}
                onChange={(event) => onChange("startYear", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentYear">{t('mortgageCalc.currentYear')}</Label>
              <Input
                id="currentYear"
                type="number"
                required
                value={userInput.currentYear}
                onChange={(event) => onChange("currentYear", event.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={onSave} className="gap-2">
              <Save className="h-4 w-4" />
              {t('mortgageCalc.saveParams')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
