import { useCompoundInterest } from '../hooks/useCompoundInterest';
import CalculatorForm from '../components/CalculatorForm';
import ResultCards from '../components/ResultCards';
import GrowthChart from '../components/GrowthChart';
import BreakdownTable from '../components/BreakdownTable';
import ContactCTA from '../components/ContactCTA';

export default function CalculatorPage() {
  const { inputs, setInputs, result } = useCompoundInterest();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
          Calculadora de <span className="text-brand">Juros Compostos</span>
        </h1>
        <p className="text-text-secondary">
          Descubra quanto seu dinheiro pode render ao longo do tempo. Preencha
          os campos abaixo e veja a mágica dos juros compostos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <CalculatorForm inputs={inputs} onChange={setInputs} />
        </div>
        <div className="lg:col-span-3 space-y-8">
          <ResultCards
            result={result}
            totalMonths={
              inputs.periodType === 'years' ? inputs.period * 12 : inputs.period
            }
          />
          <GrowthChart data={result.monthlyData} />
        </div>
      </div>

      <BreakdownTable data={result.monthlyData} />

      <ContactCTA />
    </main>
  );
}
