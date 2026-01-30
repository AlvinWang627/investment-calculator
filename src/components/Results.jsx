import { calculateInvestmentResults, formatter } from "../util/investment";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Results({ input }) {
  const { t } = useTranslation();
  const resultData = calculateInvestmentResults(input);
  const initialInvestment =
    resultData[0].valueEndOfYear -
    resultData[0].interest -
    resultData[0].annualInvestment;

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('investmentCalc.resultsTitle')}</CardTitle>
          <CardDescription>
            {t('investmentCalc.resultsDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{t('investmentCalc.year')}</TableHead>
                <TableHead className="text-right">{t('investmentCalc.value')}</TableHead>
                <TableHead className="text-right">{t('investmentCalc.interestYear')}</TableHead>
                <TableHead className="text-right">{t('investmentCalc.totalInterest')}</TableHead>
                <TableHead className="text-right">{t('investmentCalc.investedCapital')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultData.map((yearData) => {
                const totalInterest =
                  yearData.valueEndOfYear -
                  yearData.annualInvestment * yearData.year -
                  initialInvestment;
                const totalAmountInvested = yearData.valueEndOfYear - totalInterest;
                return (
                  <TableRow key={yearData.year}>
                    <TableCell className="font-medium">{yearData.year}</TableCell>
                    <TableCell className="text-right font-semibold text-emerald-600">
                      {formatter.format(yearData.valueEndOfYear)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatter.format(yearData.interest)}
                    </TableCell>
                    <TableCell className="text-right text-teal-600">
                      {formatter.format(totalInterest)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatter.format(totalAmountInvested)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Results;
