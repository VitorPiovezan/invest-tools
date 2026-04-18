import { useState, useMemo } from 'react';

export interface CalcInputs {
  initialAmount: number;
  monthlyDeposit: number;
  interestRate: number;
  period: number;
  rateType: 'monthly' | 'annual';
  periodType: 'months' | 'years';
}

export interface MonthlyData {
  month: number;
  totalInvested: number;
  totalAmount: number;
  interestEarned: number;
}

export interface CalcResult {
  totalAmount: number;
  totalInvested: number;
  totalInterest: number;
  monthlyData: MonthlyData[];
}

const DEFAULT_INPUTS: CalcInputs = {
  initialAmount: 1000,
  monthlyDeposit: 500,
  interestRate: 1,
  period: 10,
  rateType: 'monthly',
  periodType: 'years',
};

export function useCompoundInterest() {
  const [inputs, setInputs] = useState<CalcInputs>(DEFAULT_INPUTS);

  const result = useMemo<CalcResult>(() => {
    const {
      initialAmount,
      monthlyDeposit,
      interestRate,
      period,
      rateType,
      periodType,
    } = inputs;

    const monthlyRate =
      rateType === 'annual'
        ? Math.pow(1 + interestRate / 100, 1 / 12) - 1
        : interestRate / 100;

    const totalMonths = periodType === 'years' ? period * 12 : period;

    const monthlyData: MonthlyData[] = [];
    let currentAmount = initialAmount;

    for (let month = 1; month <= totalMonths; month++) {
      currentAmount = currentAmount * (1 + monthlyRate) + monthlyDeposit;
      const totalInvested = initialAmount + monthlyDeposit * month;
      monthlyData.push({
        month,
        totalInvested,
        totalAmount: Math.round(currentAmount * 100) / 100,
        interestEarned: Math.round((currentAmount - totalInvested) * 100) / 100,
      });
    }

    const totalInvested = initialAmount + monthlyDeposit * totalMonths;
    return {
      totalAmount: Math.round(currentAmount * 100) / 100,
      totalInvested,
      totalInterest: Math.round((currentAmount - totalInvested) * 100) / 100,
      monthlyData,
    };
  }, [inputs]);

  return { inputs, setInputs, result };
}
