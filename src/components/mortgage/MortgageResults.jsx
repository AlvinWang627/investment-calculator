import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatter } from "../../util/mortgage";

export default function MortgageResults({ summary, userInput }) {
  const progressPercentage = Math.min(summary.paymentProgress, 100);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>房貸摘要</CardTitle>
          <CardDescription>
            您的房貸還款計劃摘要資訊
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 寬限期月付金 */}
            {userInput.gracePeriod > 0 && (
              <div className="space-y-2">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  寬限期月付金（只付利息）
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatter.format(summary.graceMonthlyPayment)}
                </div>
                <div className="text-xs text-slate-500">
                  前 {userInput.gracePeriod} 年
                </div>
              </div>
            )}

            {/* 正常期月付金 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {userInput.gracePeriod > 0 ? '正常期月付金（本息攤還）' : '每月還款金額'}
              </div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatter.format(summary.regularMonthlyPayment)}
              </div>
              {userInput.gracePeriod > 0 && (
                <div className="text-xs text-slate-500">
                  第 {userInput.gracePeriod + 1} 年起
                </div>
              )}
            </div>

            {/* 總還款金額 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                總還款金額
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatter.format(summary.totalPayment)}
              </div>
              <div className="text-xs text-slate-500">
                {userInput.loanTerm} 年
              </div>
            </div>

            {/* 總利息 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                總利息
              </div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {formatter.format(summary.totalInterest)}
              </div>
              <div className="text-xs text-slate-500">
                利率 {userInput.annualRate}%
              </div>
            </div>

            {/* 已支付金額 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                已支付總額
              </div>
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {formatter.format(summary.totalPaid)}
              </div>
              <div className="text-xs text-slate-500">
                本金 {formatter.format(summary.principalPaid)} +
                利息 {formatter.format(summary.interestPaid)}
              </div>
            </div>

            {/* 剩餘本金 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                剩餘本金
              </div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatter.format(summary.remainingBalance)}
              </div>
              <div className="text-xs text-slate-500">
                原始本金 {formatter.format(userInput.loanAmount)}
              </div>
            </div>
          </div>

          {/* 還款進度條 */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">還款進度</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>已還本金: {formatter.format(summary.principalPaid)}</span>
              <span>剩餘本金: {formatter.format(summary.remainingBalance)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
