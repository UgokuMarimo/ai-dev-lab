import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPredictionBySlug, getPredictionSlugs } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Calendar, ArrowLeft, Tag, Trophy, Sparkles } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import RacePredictionCard from '@/components/predictions/RacePredictionCard';
import FeaturedRaceHeader from '@/components/predictions/FeaturedRaceHeader';

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
    title: `${prediction.frontmatter.title} | KeibaAI 競馬予測ポータル`,
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
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
      {/* 戻るナビゲーション */}
      <div className="flex items-center justify-between">
        <Link
          href="/predictions"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b4332] hover:text-[#2d6a4f] transition-colors bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> 競馬予測開催一覧に戻る
        </Link>
        <span className="text-xs text-slate-400 inline-flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <time dateTime={prediction.frontmatter.publishedAt}>
            {formatDate(prediction.frontmatter.publishedAt)} 開催
          </time>
        </span>
      </div>

      {/* ヘッダーカード (ポータルスタイル) */}
      <header className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800 space-y-3 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-md bg-emerald-600 text-white font-extrabold text-xs tracking-wider uppercase">
            {prediction.frontmatter.category || 'AI競馬予想ポータル'}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> 全32レース AI勝率スコア掲載
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
          {prediction.frontmatter.title}
        </h1>

        {prediction.frontmatter.subtitle && (
          <p className="text-sm sm:text-base font-semibold text-emerald-400">
            {prediction.frontmatter.subtitle}
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {prediction.frontmatter.tags?.map((tag) => (
            <span key={tag} className="text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* メイン競馬ポータルコンテンツ (MDX + カスタムコンポーネント) */}
      <main className="w-full space-y-8">
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-[#1b4332] prose-table:w-full prose-table:border-collapse prose-th:bg-slate-800 prose-th:text-white prose-th:p-2.5 prose-td:p-2.5 prose-td:border-b prose-td:border-slate-200">
          <MDXRemote
            source={prediction.content}
            components={{
              RacePredictionCard,
              FeaturedRaceHeader,
            }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </main>

      {/* フッターナビ */}
      <footer className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs">
        <Link
          href="/predictions"
          className="inline-flex items-center gap-1.5 font-bold text-[#1b4332] hover:text-[#2d6a4f]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> 他の開催日の予測を見る
        </Link>
      </footer>
    </div>
  );
}
