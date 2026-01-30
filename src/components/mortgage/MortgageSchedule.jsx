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
import { formatter } from "../../util/mortgage";

export default function MortgageSchedule({ schedule }) {
  const { t } = useTranslation();

  const getStatusBadge = (status) => {
    const badges = {
      'grace-completed': { text: t('mortgageCalc.status.graceCompleted'), className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
      'grace-current': { text: t('mortgageCalc.status.graceCurrent'), className: 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200' },
      'grace-future': { text: t('mortgageCalc.status.graceFuture'), className: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400' },
      'completed': { text: t('mortgageCalc.status.completed'), className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
      'current': { text: t('mortgageCalc.status.current'), className: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' },
      'future': { text: t('mortgageCalc.status.future'), className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
    };

    const badge = badges[status] || badges['future'];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${badge.className}`}>
        {badge.text}
      </span>
    );
  };

  const getRowClassName = (status) => {
    if (status.includes('completed')) {
      return 'bg-slate-50 dark:bg-slate-900';
    }
    if (status.includes('current')) {
      return 'bg-yellow-50 dark:bg-yellow-950';
    }
    if (status.includes('grace')) {
      return 'bg-blue-50/30 dark:bg-blue-950/30';
    }
    return '';
  };

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('mortgageCalc.scheduleTitle')}</CardTitle>
          <CardDescription>
            {t('mortgageCalc.scheduleDesc', { months: schedule.length })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">{t('mortgageCalc.table.month')}</TableHead>
                  <TableHead className="w-[120px]">{t('mortgageCalc.table.date')}</TableHead>
                  <TableHead className="text-right">{t('mortgageCalc.table.beginningBalance')}</TableHead>
                  <TableHead className="text-right">{t('mortgageCalc.table.principal')}</TableHead>
                  <TableHead className="text-right">{t('mortgageCalc.table.interest')}</TableHead>
                  <TableHead className="text-right">{t('mortgageCalc.table.total')}</TableHead>
                  <TableHead className="text-right">{t('mortgageCalc.table.endingBalance')}</TableHead>
                  <TableHead className="text-center">{t('mortgageCalc.table.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((monthData) => (
                  <TableRow
                    key={monthData.month}
                    className={getRowClassName(monthData.status)}
                  >
                    <TableCell className="font-medium">
                      {monthData.month}
                    </TableCell>
                    <TableCell>
                      {monthData.year}/{monthData.monthInYear.toString().padStart(2, '0')}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatter.format(monthData.beginningBalance)}
                    </TableCell>
                    <TableCell className="text-right text-emerald-600 dark:text-emerald-400 font-medium">
                      {formatter.format(monthData.principal)}
                    </TableCell>
                    <TableCell className="text-right text-orange-600 dark:text-orange-400">
                      {formatter.format(monthData.interest)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-purple-600 dark:text-purple-400">
                      {formatter.format(monthData.monthlyPayment)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatter.format(monthData.endingBalance)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(monthData.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
