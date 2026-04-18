import type { MonthlyData } from '../hooks/useCompoundInterest';
import { formatCurrency } from '../utils/format';
import { useState } from 'react';

interface BreakdownTableProps {
  data: MonthlyData[];
}

export default function BreakdownTable({ data }: BreakdownTableProps) {
  const [showAll, setShowAll] = useState(false);

  const yearlyData = data.filter(
    d => d.month % 12 === 0 || d.month === data.length,
  );
  const displayData = showAll ? yearlyData : yearlyData.slice(0, 10);

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-brand"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-text-primary">
            Detalhamento Anual
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-text-muted font-medium">
                Ano
              </th>
              <th className="text-right py-3 px-2 text-text-muted font-medium">
                Investido
              </th>
              <th className="text-right py-3 px-2 text-text-muted font-medium">
                Juros
              </th>
              <th className="text-right py-3 px-2 text-text-muted font-medium">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map(row => (
              <tr
                key={row.month}
                className="border-b border-border/50 hover:bg-surface-light/50 transition-colors"
              >
                <td className="py-3 px-2 text-text-secondary">
                  {row.month % 12 === 0
                    ? `${row.month / 12} ano${row.month / 12 > 1 ? 's' : ''}`
                    : `${Math.floor(row.month / 12)}a ${row.month % 12}m`}
                </td>
                <td className="py-3 px-2 text-right text-invested">
                  {formatCurrency(row.totalInvested)}
                </td>
                <td className="py-3 px-2 text-right text-profit">
                  {formatCurrency(row.interestEarned)}
                </td>
                <td className="py-3 px-2 text-right text-text-primary font-medium">
                  {formatCurrency(row.totalAmount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {yearlyData.length > 10 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-sm text-brand hover:text-brand-light transition-colors"
        >
          {showAll
            ? 'Mostrar menos'
            : `Ver todos os ${yearlyData.length} períodos`}
        </button>
      )}
    </div>
  );
}
