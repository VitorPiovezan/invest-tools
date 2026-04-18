import { Link } from 'react-router-dom';

const TOOLS = [
  {
    title: 'Calculadora de Juros Compostos',
    description:
      'Simule seus investimentos e veja o poder dos juros compostos ao longo do tempo.',
    to: '/calculadora-de-juros-compostos',
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
          d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
        />
      </svg>
    ),
    color: 'from-surface-lighter/40 to-surface-lighter/10',
    borderColor: 'border-surface-lighter/50',
    iconBg: 'bg-surface-lighter/30',
    iconColor: 'text-text-muted',
    tag: 'Disponível',
  },
  {
    title: 'Seja um Investidor',
    description:
      'Aprenda a investir do zero e agende uma análise gratuita com um assessor de investimentos.',
    to: '/seja-um-investidor',
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
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
    color: 'from-surface-lighter/40 to-surface-lighter/10',
    borderColor: 'border-surface-lighter/50',
    iconBg: 'bg-surface-lighter/30',
    iconColor: 'text-text-muted',
    tag: 'Disponível',
  },
  {
    title: 'Panorama de Mercado',
    description:
      'Acompanhe os principais índices e indicadores do mercado financeiro em tempo real.',
    to: '/panorama-de-mercado',
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
    color: 'from-surface-lighter/40 to-surface-lighter/10',
    borderColor: 'border-surface-lighter/50',
    iconBg: 'bg-surface-lighter/30',
    iconColor: 'text-text-muted',
    tag: 'Disponível',
  },
];

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          Ferramentas para <span className="text-brand">Investidores</span>
        </h1>
        <p className="text-lg text-text-secondary">
          Calculadoras, simuladores e conteúdo para te ajudar a tomar melhores
          decisões financeiras.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map(tool => (
          <Link
            key={tool.to}
            to={tool.to}
            className="group bg-surface border border-border rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 hover:border-brand/30"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center ${tool.iconColor}`}
              >
                {tool.icon}
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  tool.tag === 'Disponível'
                    ? 'bg-brand/10 text-brand'
                    : 'bg-surface-lighter/50 text-text-muted'
                }`}
              >
                {tool.tag}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-brand transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {tool.description}
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm text-text-muted group-hover:text-brand transition-colors">
              <span>Acessar</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
