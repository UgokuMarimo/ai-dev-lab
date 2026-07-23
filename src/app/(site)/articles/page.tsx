import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Articles | AI Dev Lab',
  description: 'AI個人開発のプロセス、実装ノウハウ、検証ログの記事一覧。',
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="h-4 w-4" />
          <span>Development Logs & Articles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">記事・開発ログ</h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          「AIを使った個人開発は副業になり得るのか」をテーマにした技術設計、開発過程、収益・検証結果のすべての記録。
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="flex flex-col justify-between rounded-xl bg-slate-900/60 border border-slate-800/80 p-6 hover:border-slate-700 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 font-medium">
                  {article.frontmatter.category}
                </span>
                <time dateTime={article.frontmatter.publishedAt}>
                  {formatDate(article.frontmatter.publishedAt)}
                </time>
              </div>

              <h2 className="font-bold text-lg text-white hover:text-emerald-400 transition-colors line-clamp-2">
                <Link href={`/articles/${article.slug}`}>
                  {article.frontmatter.title}
                </Link>
              </h2>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {article.frontmatter.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1.5">
                {article.frontmatter.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-slate-500">
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/articles/${article.slug}`}
                className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
              >
                読む <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
