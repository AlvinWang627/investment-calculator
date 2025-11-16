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
  const getStatusBadge = (status) => {
    const badges = {
      'grace-completed': { text: '寬限期 ✓', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
      'grace-current': { text: '寬限期 (進行中)', className: 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200' },
      'grace-future': { text: '寬限期', className: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400' },
      'completed': { text: '已完成 ✓', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
      'current': { text: '進行中', className: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' },
      'future': { text: '未來', className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
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
    <div className="max-w-6xl mx-auto px-4 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>月度還款明細</CardTitle>
          <CardDescription>
            詳細的每月還款計劃（共 {schedule.length} 個月）
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">月份</TableHead>
                  <TableHead className="w-[120px]">日期</TableHead>
                  <TableHead className="text-right">月初餘額</TableHead>
                  <TableHead className="text-right">月付本金</TableHead>
                  <TableHead className="text-right">月付利息</TableHead>
                  <TableHead className="text-right">月付總額</TableHead>
                  <TableHead className="text-right">月終餘額</TableHead>
                  <TableHead className="text-center">狀態</TableHead>
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
