import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculate1RM, generate1RMTable } from "../util/strengthCalculations";

export default function OneRepMax() {
  const { t } = useTranslation();
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [formula, setFormula] = useState("epley");
  const [result, setResult] = useState(null);
  const [percentageTable, setPercentageTable] = useState([]);

  useEffect(() => {
    if (weight && reps && !isNaN(weight) && !isNaN(reps) && Number(weight) > 0 && Number(reps) > 0) {
      const oneRm = calculate1RM(Number(weight), Number(reps), formula);
      setResult(oneRm);
      setPercentageTable(generate1RMTable(oneRm));
    } else {
      setResult(null);
      setPercentageTable([]);
    }
  }, [weight, reps, formula]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('oneRepMax.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('oneRepMax.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('oneRepMax.inputTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">{t('oneRepMax.weight')} (kg/lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="例如: 100"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reps">{t('oneRepMax.reps')}</Label>
                <Input
                  id="reps"
                  type="number"
                  placeholder="例如: 5"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  min="1"
                  max="30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formula">{t('oneRepMax.formula')}</Label>
                <Select value={formula} onValueChange={setFormula}>
                  <SelectTrigger id="formula">
                    <SelectValue placeholder="選擇公式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="epley">{t('oneRepMax.epley')}</SelectItem>
                    <SelectItem value="brzycki">{t('oneRepMax.brzycki')}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('oneRepMax.formulaDesc')}
                </p>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t('oneRepMax.estimatedOneRm')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">
                  {Math.round(result * 10) / 10}
                  <span className="text-lg font-normal text-muted-foreground ml-1">
                    kg/lbs
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Table Section */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{t('oneRepMax.tableTitle')}</CardTitle>
              <CardDescription>
                {t('oneRepMax.tableDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {percentageTable.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">{t('oneRepMax.intensity')}</TableHead>
                        <TableHead>{t('oneRepMax.weight')}</TableHead>
                        <TableHead className="text-right">{t('oneRepMax.estReps')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {percentageTable.map((row) => (
                        <TableRow key={row.percentage}>
                          <TableCell className="font-medium">{row.percentage}%</TableCell>
                          <TableCell>{Math.round(row.weight * 10) / 10}</TableCell>
                          <TableCell className="text-right">{row.reps}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground border-2 border-dashed rounded-lg">
                  <span className="text-4xl mb-4">📊</span>
                  <p>{t('oneRepMax.emptyState')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
