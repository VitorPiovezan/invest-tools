import { useMarketData } from '../hooks/useMarketData';

export default function MarketPage() {
  const { indices, hasToken } = useMarketData();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
          Panorama de <span className="text-brand">Mercado</span>
        </h1>
        <p className="text-text-secondary">
          Acompanhe os principais índices e indicadores do mercado financeiro em
          tempo real.
        </p>
      </div>

      {!hasToken && (
        <div className="bg-surface border border-brand/30 rounded-2xl p-5 mb-8 text-center">
          <p className="text-sm text-text-secondary">
            Para exibir Ibovespa, IFIX e S&P 500, configure a variável de
            ambiente{' '}
            <code className="text-brand bg-brand/10 px-1.5 py-0.5 rounded text-xs">
              VITE_BRAPI_TOKEN
            </code>{' '}
            com seu token gratuito da{' '}
            <a
              href="https://brapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline"
            >
              brapi.dev
            </a>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {indices.map(index => (
          <div
            key={index.name}
            className="bg-surface border border-border rounded-2xl p-5 hover:border-brand/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-text-secondary">
                {index.name}
              </h3>
              {index.source && (
                <span className="text-[10px] text-text-muted bg-surface-light px-2 py-0.5 rounded-full">
                  {index.source}
                </span>
              )}
            </div>

            {index.loading ? (
              <div className="space-y-2">
                <div className="h-8 bg-surface-light rounded-lg animate-pulse w-32" />
                <div className="h-4 bg-surface-light rounded-lg animate-pulse w-20" />
              </div>
            ) : index.error ? (
              <div className="space-y-1">
                <p className="text-lg text-text-muted">Indisponível</p>
                <p className="text-xs text-text-muted">
                  {index.name === 'Ibovespa' ||
                  index.name === 'IFIX' ||
                  index.name === 'S&P 500'
                    ? 'Configure o token da brapi'
                    : 'Erro ao carregar'}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-2xl font-bold text-text-primary mb-1">
                  {index.value}
                </p>
                {index.changePercent && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${index.isPositive ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {index.changePercent}
                    </span>
                    {index.change && (
                      <span className="text-xs text-text-muted">
                        {index.change}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-text-muted">
          Dados com atraso de até 15 minutos. Fonte: AwesomeAPI, Banco Central
          do Brasil, brapi.dev
        </p>
      </div>
    </main>
  );
}
