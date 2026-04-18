import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
          <span className="text-brand">Blog</span> de Investimentos
        </h1>
        <p className="text-text-secondary">
          Conteúdo prático sobre investimentos, mercado financeiro e educação
          financeira.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block bg-surface border border-border rounded-2xl p-6 hover:border-brand/30 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3 text-sm text-text-muted">
              <time>{formatDate(post.date)}</time>
              <span>-</span>
              <span>{post.readTime} de leitura</span>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-brand transition-colors">
              {post.title}
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              {post.summary}
            </p>
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
          </Link>
        ))}
      </div>
    </main>
  );
}
