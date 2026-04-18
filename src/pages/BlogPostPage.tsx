import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { getPostBySlug } from '../data/posts';

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Post não encontrado
        </h1>
        <Link
          to="/blog"
          className="text-brand hover:text-brand-light transition-colors"
        >
          Voltar para o blog
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-brand transition-colors mb-8"
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
        Voltar para o blog
      </Link>

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm text-text-muted">
            <time>{formatDate(post.date)}</time>
            <span>-</span>
            <span>{post.readTime} de leitura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs bg-surface-light text-text-muted px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="prose-custom">
          <Markdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-text-primary mt-8 mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-text-primary mt-6 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-text-secondary leading-relaxed mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-text-secondary">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="text-text-primary font-semibold">
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-brand hover:text-brand-light underline transition-colors"
                >
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </article>
    </main>
  );
}
