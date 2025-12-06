import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserInput({ userInput, onChange }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Investment Parameters</CardTitle>
          <CardDescription>
            Enter your investment details to calculate potential returns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
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
              <Label htmlFor="annualInvestment">Annual Investment ($)</Label>
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
              <Label htmlFor="expectedReturn">Expected Return (%)</Label>
              <Input
                id="expectedReturn"
                type="number"
                required
                value={userInput.expectedReturn}
                onChange={(event) => onChange("expectedReturn", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Years)</Label>
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
