import { useState, useRef, useEffect } from 'react';
import type { CalcInputs } from '../hooks/useCompoundInterest';
import InputField from './InputField';

interface CalculatorFormProps {
  inputs: CalcInputs;
  onChange: (inputs: CalcInputs) => void;
}

export default function CalculatorForm({
  inputs,
  onChange,
}: CalculatorFormProps) {
  const update = (field: keyof CalcInputs, value: number | string) => {
    onChange({ ...inputs, [field]: value });
  };

  const [rateDisplay, setRateDisplay] = useState(String(inputs.interestRate));
  const rateFocused = useRef(false);

  useEffect(() => {
    if (!rateFocused.current) {
      setRateDisplay(String(inputs.interestRate));
    }
  }, [inputs.interestRate]);

  const totalMonths =
    inputs.periodType === 'years' ? inputs.period * 12 : inputs.period;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const periodMax = inputs.periodType === 'years' ? 50 : 600;

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3 mb-2">
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
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-text-primary">
          Dados do Investimento
        </h2>
      </div>

      <InputField
        label="Valor Inicial"
        value={inputs.initialAmount}
        onChange={v => update('initialAmount', v)}
        prefix="R$"
        step={100}
        helpText="Quanto você tem para começar"
      />

      <InputField
        label="Aporte Mensal"
        value={inputs.monthlyDeposit}
        onChange={v => update('monthlyDeposit', v)}
        prefix="R$"
        step={50}
        helpText="Quanto vai investir todo mês"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">
          Taxa de Juros
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              value={rateDisplay}
              onChange={e => {
                setRateDisplay(e.target.value);
                const num = Number(e.target.value);
                if (e.target.value !== '' && !isNaN(num)) {
                  update('interestRate', num);
                }
              }}
              onFocus={() => {
                rateFocused.current = true;
                if (Number(rateDisplay) === 0) setRateDisplay('');
              }}
              onBlur={() => {
                rateFocused.current = false;
                if (rateDisplay === '' || isNaN(Number(rateDisplay))) {
                  setRateDisplay('0');
                  update('interestRate', 0);
                } else {
                  setRateDisplay(String(Number(rateDisplay)));
                }
              }}
              step={0.01}
              min={0}
              className="w-full bg-surface-light border border-border rounded-xl py-3 pl-4 pr-10 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
              %
            </span>
          </div>
          <div className="flex bg-surface-light border border-border rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => update('rateType', 'monthly')}
              className={`px-4 py-3 text-sm font-medium transition-all ${
                inputs.rateType === 'monthly'
                  ? 'bg-brand text-black'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => update('rateType', 'annual')}
              className={`px-4 py-3 text-sm font-medium transition-all ${
                inputs.rateType === 'annual'
                  ? 'bg-brand text-black'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Anual
            </button>
          </div>
        </div>
        <p className="text-xs text-text-muted">
          {inputs.rateType === 'monthly'
            ? 'Taxa mensal do investimento'
            : 'Taxa anual (será convertida para mensal)'}
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">
          Período
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <InputField
              label=""
              value={inputs.period}
              onChange={v =>
                update('period', Math.min(Math.max(v, 1), periodMax))
              }
              min={1}
              max={periodMax}
            />
          </div>
          <div className="flex bg-surface-light border border-border rounded-xl overflow-hidden h-[48px] self-end">
            <button
              type="button"
              onClick={() => {
                if (inputs.periodType === 'years') {
                  onChange({
                    ...inputs,
                    periodType: 'months',
                    period: inputs.period * 12,
                  });
                }
              }}
              className={`px-4 py-3 text-sm font-medium transition-all ${
                inputs.periodType === 'months'
                  ? 'bg-brand text-black'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Meses
            </button>
            <button
              type="button"
              onClick={() => {
                if (inputs.periodType === 'months') {
                  onChange({
                    ...inputs,
                    periodType: 'years',
                    period: Math.max(1, Math.round(inputs.period / 12)),
                  });
                }
              }}
              className={`px-4 py-3 text-sm font-medium transition-all ${
                inputs.periodType === 'years'
                  ? 'bg-brand text-black'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Anos
            </button>
          </div>
        </div>
        <p className="text-xs text-text-muted">
          Equivale a {years} ano{years !== 1 ? 's' : ''}
          {months > 0 ? ` e ${months} mes${months !== 1 ? 'es' : ''}` : ''}
        </p>
      </div>
    </div>
  );
}
