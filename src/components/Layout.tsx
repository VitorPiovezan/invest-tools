import { Link, useLocation, Outlet } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/calculadora-de-juros-compostos', label: 'Calculadora' },
  { to: '/panorama-de-mercado', label: 'Mercado' },
  { to: '/seja-um-investidor', label: 'Seja um Investidor' },
];

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-border/50 backdrop-blur-sm bg-[#0a0a0a]/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center group-hover:bg-brand-dark transition-colors">
              <svg
                className="w-5 h-5 text-black"
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
            <span className="text-lg font-semibold text-text-primary">
              Otávio Brandão
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.to
                    ? 'text-brand bg-brand/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="md:hidden text-text-secondary"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              menu?.classList.toggle('hidden');
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          id="mobile-menu"
          className="hidden md:hidden border-t border-border/50 px-4 py-2"
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() =>
                document.getElementById('mobile-menu')?.classList.add('hidden')
              }
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === link.to
                  ? 'text-brand bg-brand/10'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>

      <Outlet />

      <footer className="border-t border-border/50 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-text-muted">
          <p>
            Ferramentas educacionais para investidores. Resultados reais podem
            variar.
          </p>
        </div>
      </footer>
    </div>
  );
}
