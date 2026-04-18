import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { MonthlyData } from '../hooks/useCompoundInterest';
import { formatCurrency } from '../utils/format';

interface GrowthChartProps {
  data: MonthlyData[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: number;
}) {
  if (!active || !payload?.length) return null;

  const totalAmount =
    payload.find(p => p.dataKey === 'totalAmount')?.value ?? 0;
  const totalInvested =
    payload.find(p => p.dataKey === 'totalInvested')?.value ?? 0;
  const interest = totalAmount - totalInvested;

  return (
    <div className="bg-surface-light border border-border rounded-xl p-4 shadow-xl">
      <p className="text-sm text-text-muted mb-2">
        Mes {label} ({Math.floor((label ?? 0) / 12)}a {(label ?? 0) % 12}m)
      </p>
      <div className="space-y-1">
        <p className="text-sm">
          <span className="text-text-secondary">Total: </span>
          <span className="text-text-primary font-semibold">
            {formatCurrency(totalAmount)}
          </span>
        </p>
        <p className="text-sm">
          <span className="text-text-secondary">Investido: </span>
          <span className="text-invested font-medium">
            {formatCurrency(totalInvested)}
          </span>
        </p>
        <p className="text-sm">
          <span className="text-text-secondary">Juros: </span>
          <span className="text-profit font-medium">
            {formatCurrency(interest)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default function GrowthChart({ data }: GrowthChartProps) {
  const sampledData =
    data.length > 60
      ? data.filter(
          (_, i) =>
            i % Math.ceil(data.length / 60) === 0 || i === data.length - 1,
        )
      : data;

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
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
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-text-primary">
          Evolução do Patrimônio
        </h2>
      </div>

      <div className="flex gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-invested" />
          <span className="text-text-secondary">Investido</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-profit" />
          <span className="text-text-secondary">Juros</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={sampledData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="gradientInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0a800" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#e0a800" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis
              dataKey="month"
              stroke="#737373"
              fontSize={12}
              tickFormatter={v => `${Math.floor(v / 12)}a`}
            />
            <YAxis
              stroke="#737373"
              fontSize={12}
              tickFormatter={v => {
                if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
                if (v >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
                return v.toString();
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="totalInvested"
              stroke="#f97316"
              fill="url(#gradientInvested)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="totalAmount"
              stroke="#e0a800"
              fill="url(#gradientTotal)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
