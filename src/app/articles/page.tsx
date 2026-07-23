import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

export const metadata = {
  title: 'Articles | AI Dev Lab',
  description: 'AI個人開発のプロセス、実装ノウハウ、検証ログの記事一覧。',
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="h-4 w-4" />
          <span>Development Logs & Articles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">記事・開発ログ一覧</h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
          「AIを使った個人開発は副業になり得るのか」をテーマにした技術設計、開発過程、収益・検証結果のすべての記録。
        </p>
      </div>

      {/* Articles Feed */}
      <div className="space-y-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="group bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  {article.frontmatter.category}
                </span>
                <span className="text-slate-400 inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <time dateTime={article.frontmatter.publishedAt}>
                    {formatDate(article.frontmatter.publishedAt)}
                  </time>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                <Link href={`/articles/${article.slug}`}>
                  {article.frontmatter.title}
                  {article.frontmatter.subtitle && (
                    <span className="block text-sm font-bold text-emerald-700 mt-1">
                      {article.frontmatter.subtitle}
                    </span>
                  )}
                </Link>
              </h2>

              <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {article.frontmatter.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {article.frontmatter.tags.map((tag) => (
                  <span key={tag} className="text-xs text-slate-500 inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                    <Tag className="h-3 w-3 text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/articles/${article.slug}`}
                className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 inline-flex items-center gap-1"
              >
                読む <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
