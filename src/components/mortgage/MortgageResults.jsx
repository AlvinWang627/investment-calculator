import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatter } from "../../util/mortgage";

export default function MortgageResults({ summary, userInput }) {
  const { t } = useTranslation();
  const progressPercentage = Math.min(summary.paymentProgress, 100);

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('mortgageCalc.summaryTitle')}</CardTitle>
          <CardDescription>
            {t('mortgageCalc.summaryDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 寬限期月付金 */}
            {userInput.gracePeriod > 0 && (
              <div className="space-y-2">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {t('mortgageCalc.gracePayment')}
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatter.format(summary.graceMonthlyPayment)}
                </div>
                <div className="text-xs text-slate-500">
                  {t('mortgageCalc.firstYears', { count: userInput.gracePeriod })}
                </div>
              </div>
            )}

            {/* 正常期月付金 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {userInput.gracePeriod > 0 ? t('mortgageCalc.regularPayment') : t('mortgageCalc.monthlyPayment')}
              </div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatter.format(summary.regularMonthlyPayment)}
              </div>
              {userInput.gracePeriod > 0 && (
                <div className="text-xs text-slate-500">
                  {t('mortgageCalc.fromYear', { year: userInput.gracePeriod + 1 })}
                </div>
              )}
            </div>

            {/* 總還款金額 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {t('mortgageCalc.totalPayment')}
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatter.format(summary.totalPayment)}
              </div>
              <div className="text-xs text-slate-500">
                {t('mortgageCalc.years', { count: userInput.loanTerm })}
              </div>
            </div>

            {/* 總利息 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {t('mortgageCalc.totalInterest')}
              </div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {formatter.format(summary.totalInterest)}
              </div>
              <div className="text-xs text-slate-500">
                {t('mortgageCalc.rate', { rate: userInput.annualRate })}
              </div>
            </div>

            {/* 已支付金額 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {t('mortgageCalc.totalPaid')}
              </div>
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {formatter.format(summary.totalPaid)}
              </div>
              <div className="text-xs text-slate-500">
                {t('mortgageCalc.principalInterest', {
                  principal: formatter.format(summary.principalPaid),
                  interest: formatter.format(summary.interestPaid)
                })}
              </div>
            </div>

            {/* 剩餘本金 */}
            <div className="space-y-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {t('mortgageCalc.remainingPrincipal')}
              </div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatter.format(summary.remainingBalance)}
              </div>
              <div className="text-xs text-slate-500">
                {t('mortgageCalc.originalPrincipal', { amount: userInput.loanAmount })}
              </div>
            </div>
          </div>

          {/* 還款進度條 */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">{t('mortgageCalc.progress')}</span>
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
              <span>{t('mortgageCalc.paidPrincipal', { amount: formatter.format(summary.principalPaid) })}</span>
              <span>{t('mortgageCalc.remainingPrincipalLabel', { amount: formatter.format(summary.remainingBalance) })}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
