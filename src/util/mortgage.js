// 數字格式化工具（千分位，不顯示幣別）
export const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * 計算月付金額
 * @param {number} principal - 本金
 * @param {number} annualRate - 年利率 (%)
 * @param {number} months - 還款月數
 * @returns {number} 月付金額
 */
export function calculateMonthlyPayment(principal, annualRate, months) {
  if (months === 0) return 0;

  const monthlyRate = annualRate / 100 / 12;

  // 如果利率為 0，直接平均分攤
  if (monthlyRate === 0) {
    return principal / months;
  }

  // 本息平均攤還公式: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPayment =
    principal *
    (monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return monthlyPayment;
}

/**
 * 計算房貸月度還款明細
 * @param {Object} params - 參數
 * @param {number} params.loanAmount - 房貸總額
 * @param {number} params.annualRate - 年利率 (%)
 * @param {number} params.loanTerm - 貸款年數
 * @param {number} params.gracePeriod - 寬限期（年）
 * @param {number} params.startYear - 開始西元年
 * @param {number} params.currentYear - 目前西元年
 * @returns {Array} 月度還款明細陣列
 */
export function calculateMortgageSchedule({
  loanAmount,
  annualRate,
  loanTerm,
  gracePeriod,
  startYear,
  currentYear,
}) {
  const totalMonths = loanTerm * 12;
  const graceMonths = gracePeriod * 12;
  const regularMonths = totalMonths - graceMonths;
  const monthlyRate = annualRate / 100 / 12;

  const schedule = [];
  let remainingBalance = loanAmount;

  // 計算寬限期月付金（只付利息）
  const graceMonthlyPayment = loanAmount * monthlyRate;

  // 計算正常期月付金（本息平均攤還）
  const regularMonthlyPayment = calculateMonthlyPayment(
    loanAmount,
    annualRate,
    regularMonths
  );

  for (let month = 1; month <= totalMonths; month++) {
    const yearOffset = Math.floor((month - 1) / 12);
    const monthInYear = ((month - 1) % 12) + 1;
    const year = startYear + yearOffset;

    const beginningBalance = remainingBalance;

    let interest;
    let principal;
    let monthlyPayment;
    let status;

    // 判斷是否在寬限期內
    if (month <= graceMonths) {
      // 寬限期：只付利息
      interest = beginningBalance * monthlyRate;
      principal = 0;
      monthlyPayment = graceMonthlyPayment;
      status = 'grace';
    } else {
      // 正常期：本息平均攤還
      interest = beginningBalance * monthlyRate;
      monthlyPayment = regularMonthlyPayment;
      principal = monthlyPayment - interest;
      status = 'regular';
    }

    remainingBalance = beginningBalance - principal;

    // 最後一個月調整，避免浮點數誤差
    if (month === totalMonths) {
      principal = beginningBalance;
      remainingBalance = 0;
      monthlyPayment = principal + interest;
    }

    // 判斷付款狀態（已完成/進行中/未來）
    let paymentStatus = status;
    if (year < currentYear) {
      paymentStatus = status === 'grace' ? 'grace-completed' : 'completed';
    } else if (year === currentYear) {
      const currentMonth = new Date().getMonth() + 1;
      if (monthInYear < currentMonth) {
        paymentStatus = status === 'grace' ? 'grace-completed' : 'completed';
      } else if (monthInYear === currentMonth) {
        paymentStatus = status === 'grace' ? 'grace-current' : 'current';
      } else {
        paymentStatus = status === 'grace' ? 'grace-future' : 'future';
      }
    } else {
      paymentStatus = status === 'grace' ? 'grace-future' : 'future';
    }

    schedule.push({
      month,
      year,
      monthInYear,
      beginningBalance,
      principal,
      interest,
      monthlyPayment,
      endingBalance: remainingBalance,
      status: paymentStatus,
      isGracePeriod: month <= graceMonths,
    });
  }

  return schedule;
}

/**
 * 計算房貸摘要資訊
 * @param {Array} schedule - 月度還款明細
 * @param {number} loanAmount - 房貸總額
 * @param {number} currentYear - 目前西元年
 * @returns {Object} 摘要資訊
 */
export function calculateMortgageSummary(schedule, loanAmount, currentYear) {
  const totalPayment = schedule.reduce((sum, month) => sum + month.monthlyPayment, 0);
  const totalInterest = schedule.reduce((sum, month) => sum + month.interest, 0);

  // 計算已支付的本金和利息
  const paidMonths = schedule.filter(
    month => month.status.includes('completed')
  );

  const principalPaid = paidMonths.reduce((sum, month) => sum + month.principal, 0);
  const interestPaid = paidMonths.reduce((sum, month) => sum + month.interest, 0);
  const totalPaid = principalPaid + interestPaid;

  // 剩餘本金
  const remainingBalance = loanAmount - principalPaid;

  // 找出寬限期和正常期的月付金
  const graceMonthlyPayment = schedule.find(m => m.isGracePeriod)?.monthlyPayment || 0;
  const regularMonthlyPayment = schedule.find(m => !m.isGracePeriod)?.monthlyPayment || 0;

  return {
    graceMonthlyPayment,
    regularMonthlyPayment,
    totalPayment,
    totalInterest,
    principalPaid,
    interestPaid,
    totalPaid,
    remainingBalance,
    paymentProgress: (principalPaid / loanAmount) * 100,
  };
}
