import type { CalcResult } from '../hooks/useCompoundInterest';
import { formatCurrency } from '../utils/format';

interface ResultCardsProps {
  result: CalcResult;
  totalMonths: number;
}

export default function ResultCards({ result, totalMonths }: ResultCardsProps) {
  const profitPercent =
    result.totalInvested > 0
      ? ((result.totalInterest / result.totalInvested) * 100).toFixed(1)
      : '0';

  return (
    <div className="space-y-4">
      <div className="bg-linear-to-br from-brand/20 to-brand/5 border border-brand/30 rounded-2xl p-6">
        <p className="text-sm text-brand-light mb-1">Montante Final</p>
        <p className="text-3xl font-bold text-text-primary">
          {formatCurrency(result.totalAmount)}
        </p>
        <p className="text-xs text-text-muted mt-2">
          Em {Math.floor(totalMonths / 12)} anos e {totalMonths % 12} meses
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-2xl p-5">
          <p className="text-sm text-invested mb-1">Total Investido</p>
          <p className="text-xl font-semibold text-text-primary">
            {formatCurrency(result.totalInvested)}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5">
          <p className="text-sm text-profit mb-1">Juros Ganhos</p>
          <p className="text-xl font-semibold text-text-primary">
            {formatCurrency(result.totalInterest)}
          </p>
          <p className="text-xs text-text-muted mt-1">
            +{profitPercent}% de lucro
          </p>
        </div>
      </div>
    </div>
  );
}
