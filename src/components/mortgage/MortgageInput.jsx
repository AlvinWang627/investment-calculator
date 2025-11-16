import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MortgageInput({ userInput, onChange }) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>房貸參數</CardTitle>
          <CardDescription>
            輸入您的房貸詳細資訊以計算還款金額
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">房貸總額（萬元）</Label>
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
              <Label htmlFor="annualRate">利率 (%)</Label>
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
              <Label htmlFor="loanTerm">貸款年數</Label>
              <Input
                id="loanTerm"
                type="number"
                required
                value={userInput.loanTerm}
                onChange={(event) => onChange("loanTerm", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gracePeriod">寬限期 (年)</Label>
              <Input
                id="gracePeriod"
                type="number"
                required
                value={userInput.gracePeriod}
                onChange={(event) => onChange("gracePeriod", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startYear">開始西元年</Label>
              <Input
                id="startYear"
                type="number"
                required
                value={userInput.startYear}
                onChange={(event) => onChange("startYear", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentYear">目前西元年</Label>
              <Input
                id="currentYear"
                type="number"
                required
                value={userInput.currentYear}
                onChange={(event) => onChange("currentYear", event.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
