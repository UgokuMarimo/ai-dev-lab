import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, Tag, Folder } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ''),
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return { title: 'Not Found' };

  return {
    title: `${article.frontmatter.title} | AI Dev Lab`,
    description: article.frontmatter.description,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-12 space-y-8">
      {/* Back Link */}
      <Link
        href="/articles"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 font-semibold transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> 記事一覧に戻る
      </Link>

      {/* Header Info */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
            <Folder className="h-3 w-3" />
            {article.frontmatter.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={article.frontmatter.publishedAt}>
              {formatDate(article.frontmatter.publishedAt)}
            </time>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
          {article.frontmatter.title}
        </h1>

        <p className="text-base text-slate-700 leading-relaxed bg-slate-100/80 border-l-4 border-emerald-600 p-4 rounded-r-lg">
          {article.frontmatter.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {article.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium"
            >
              <Tag className="h-3 w-3 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article Content (MDX Rendered) */}
      <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-code:text-emerald-700 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100">
        <MDXRemote source={article.content} />
      </article>
    </div>
  );
}
