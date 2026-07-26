import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPredictionBySlug, getPredictionSlugs } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Calendar, ArrowLeft, Tag, Trophy } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPredictionSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ''),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const prediction = getPredictionBySlug(slug);
  if (!prediction) return {};

  return {
    title: `${prediction.frontmatter.title} | KeibaAI 競馬予測`,
    description: prediction.frontmatter.description,
  };
}

export default async function PredictionDetailPage({ params }: Props) {
  const { slug } = await params;
  const prediction = getPredictionBySlug(slug);

  if (!prediction) {
    notFound();
  }

  return (
    <article className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Back link */}
      <div>
        <Link
          href="/predictions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1b4332] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> 競馬予測一覧に戻る
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-[#e8f5e9] text-[#1b4332] font-semibold border border-[#2d6a4f]/20">
            {prediction.frontmatter.category || 'AI競馬予想'}
          </span>
          <span className="text-slate-400 inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={prediction.frontmatter.publishedAt}>
              {formatDate(prediction.frontmatter.publishedAt)}
            </time>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
          {prediction.frontmatter.title}
        </h1>

        {prediction.frontmatter.subtitle && (
          <p className="text-base font-semibold text-[#2d6a4f]">
            {prediction.frontmatter.subtitle}
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {prediction.frontmatter.tags?.map((tag) => (
            <span key={tag} className="text-xs text-slate-500 inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded">
              <Tag className="h-3 w-3 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article Content (MDX Render) */}
      <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-[#1b4332] prose-table:w-full prose-table:border-collapse prose-th:bg-[#f1f6f2] prose-th:p-2 prose-td:p-2 prose-td:border-b prose-td:border-slate-100">
        <MDXRemote source={prediction.content} />
      </div>

      {/* Footer Nav */}
      <div className="pt-8 border-t border-slate-200 flex justify-between items-center text-xs">
        <Link
          href="/predictions"
          className="inline-flex items-center gap-1.5 font-bold text-[#1b4332] hover:text-[#2d6a4f]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> 他の開催日の予測を見る
        </Link>
      </div>
    </article>
  );
}
