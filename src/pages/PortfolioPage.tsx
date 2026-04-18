import { Link } from 'react-router-dom';

export default function PortfolioPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-surface border border-border flex items-center justify-center">
          <svg
            className="w-12 h-12 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17l-5.384-3.19A2.625 2.625 0 003 14.172V17.5a2.625 2.625 0 002.036 2.56l5.384 1.346a2.625 2.625 0 001.16 0l5.384-1.346A2.625 2.625 0 0019 17.5v-3.328a2.625 2.625 0 00-3.036-2.192l-5.384 3.19a2.625 2.625 0 01-1.16 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 12L12 6l8.25 6"
            />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-brand"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17l-5.384-3.19A2.625 2.625 0 003 14.172V17.5"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 text-center">
        Minha Carteira
      </h1>
      <p className="text-text-secondary text-center max-w-md mb-2">
        Estou preparando a composição da minha carteira de investimentos para
        compartilhar aqui.
      </p>
      <p className="text-sm text-text-muted text-center max-w-sm mb-8">
        Esta carteira é baseada no meu perfil de investidor e no meu viés de
        mercado. Não é uma recomendação de compra ou venda.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
        <div className="bg-surface border border-border rounded-xl px-5 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          <span className="text-sm text-text-secondary">Em construção</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md opacity-30">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-4 h-20 animate-pulse"
          />
        ))}
      </div>

      <div className="mt-12">
        <Link
          to="/"
          className="text-sm text-brand hover:text-brand-light transition-colors flex items-center gap-1"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
