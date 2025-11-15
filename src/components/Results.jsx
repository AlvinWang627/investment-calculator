import { calculateInvestmentResults, formatter } from "../util/investment";
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
  const resultData = calculateInvestmentResults(input);
  const initialInvestment =
    resultData[0].valueEndOfYear -
    resultData[0].interest -
    resultData[0].annualInvestment;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Investment Growth Projection</CardTitle>
          <CardDescription>
            Year-by-year breakdown of your investment returns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Year</TableHead>
                <TableHead className="text-right">Investment Value</TableHead>
                <TableHead className="text-right">Interest (Year)</TableHead>
                <TableHead className="text-right">Total Interest</TableHead>
                <TableHead className="text-right">Invested Capital</TableHead>
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
