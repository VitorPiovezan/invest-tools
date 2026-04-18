import { useState } from 'react';

const INCOME_RANGES = [
  'R$ 0 - R$ 100.000',
  'R$ 100.000 - R$ 300.000',
  'R$ 300.000 - R$ 1.000.000',
  'R$ 1.000.000 - R$ 10.000.000',
  'Acima de R$ 10.000.000',
];

const STEPS = [
  {
    number: '01',
    title: 'Entenda seu perfil',
    description:
      'Descubra se você é conservador, moderado ou arrojado e qual estratégia faz sentido pra você.',
  },
  {
    number: '02',
    title: 'Monte sua estratégia',
    description:
      'Com base no seu perfil, objetivos e prazo, montamos um plano personalizado.',
  },
  {
    number: '03',
    title: 'Invista com acompanhamento',
    description:
      'Tenha um assessor dedicado para te guiar e ajustar sua carteira conforme o mercado.',
  },
];

const BENEFITS = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    title: 'Análise gratuita',
    description:
      'Sem compromisso. Avaliamos sua situação financeira sem custo.',
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
    title: 'Assessor dedicado',
    description: 'Atendimento personalizado com profissional certificado.',
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    title: 'Resultados reais',
    description: 'Estratégias comprovadas para fazer seu patrimônio crescer.',
  },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  incomeRange: string;
}

export default function InvestorPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    incomeRange: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    form.incomeRange;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setSending(true);

    try {
      await fetch(
        'https://formsubmit.co/ajax/otaviobrandao.w1capital@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            Nome: form.name,
            Telefone: form.phone,
            Email: form.email,
            Patrimonio: form.incomeRange,
            _subject: 'Novo lead - Seja um Investidor',
          }),
        },
      );
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-sm font-medium text-brand bg-brand/10 px-4 py-1.5 rounded-full mb-6">
              Comece a investir hoje
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Seu dinheiro pode <span className="text-brand">render mais</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              A maioria das pessoas perde dinheiro deixando na poupança. Agende
              uma análise gratuita e descubra como fazer seu patrimônio crescer
              de verdade.
            </p>
            <a
              href="#agendar"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-black font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand/25 text-lg"
            >
              Agendar análise gratuita
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            Por que investir com assessoria?
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Ter um profissional ao seu lado faz toda a diferença nos resultados.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map(benefit => (
            <div
              key={benefit.title}
              className="bg-surface border border-border rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-4 text-brand">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            Como funciona
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="bg-surface border border-border rounded-2xl p-6">
                <span className="text-3xl font-bold text-brand/30 mb-3 block">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface border-y border-border py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold text-brand mb-1">R$ 0</p>
              <p className="text-sm text-text-secondary">Custo da análise</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary mb-1">
                60 min
              </p>
              <p className="text-sm text-text-secondary">Duração da reunião</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary mb-1">100%</p>
              <p className="text-sm text-text-secondary">Personalizado</p>
            </div>
          </div>
        </div>
      </section>

      <section id="agendar" className="max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              Agende sua análise gratuita
            </h2>
            <p className="text-text-secondary">
              Preencha o formulário abaixo e entraremos em contato para agendar
              sua reunião com um assessor.
            </p>
          </div>

          {submitted ? (
            <div className="bg-brand/10 border border-brand/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Recebemos seus dados
              </h3>
              <p className="text-text-secondary">
                Em breve entraremos em contato para agendar sua análise
                gratuita. Fique de olho no seu WhatsApp e email.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => updateField('name', e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-surface-light border border-border rounded-xl py-3 px-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Telefone (WhatsApp)
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => updateField('phone', e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full bg-surface-light border border-border rounded-xl py-3 px-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => updateField('email', e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-surface-light border border-border rounded-xl py-3 px-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="income"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Patrimônio disponível para investir
                </label>
                <select
                  id="income"
                  required
                  value={form.incomeRange}
                  onChange={e => updateField('incomeRange', e.target.value)}
                  className="w-full bg-surface-light border border-border rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all appearance-none"
                >
                  <option value="" disabled>
                    Selecione sua faixa de patrimônio
                  </option>
                  {INCOME_RANGES.map(range => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={!isValid || sending}
                className="w-full bg-brand hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand/25"
              >
                {sending ? 'Enviando...' : 'Agendar análise gratuita'}
              </button>

              <p className="text-xs text-text-muted text-center">
                Seus dados estão seguros. Não compartilhamos com terceiros.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
