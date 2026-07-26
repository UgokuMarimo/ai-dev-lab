import Link from 'next/link';
import { getAllPredictions } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Calendar, Trophy, ArrowRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'AI競馬予測アーカイブ | うごく毬藻 AI Dev Lab',
  description: 'KeibaAIが毎開催日に算出する全レースのAI勝率予測および重賞予想一覧です。',
};

export default function PredictionsPage() {
  const predictions = getAllPredictions();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1e4d38] p-8 text-white shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-100 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>KeibaAI Realtime Predictions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          🏇 AI競馬予測 開催日別一覧
        </h1>
        <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
          独自開発の機械学習モデル（KeibaAI）が算出した全レースの勝率スコア・注目馬一覧です。開催日ごとに全競馬場の予測結果を掲載しています。
        </p>
      </section>

      {/* Predictions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#1b4332]" />
            全開催日の予測レポート ({predictions.length}件)
          </h2>
        </div>

        {predictions.length === 0 ? (
          <p className="text-slate-500 text-sm py-8 text-center">現在、競馬予測レポートはありません。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.map((item) => (
              <Link
                key={item.slug}
                href={`/predictions/${item.slug}`}
                className="group bg-white rounded-xl border border-slate-300 p-5 shadow-sm hover:shadow-md hover:border-[#2d6a4f] transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#1b4332] font-semibold border border-[#2d6a4f]/20">
                      {item.frontmatter.category || 'AI競馬予想'}
                    </span>
                    <span className="text-slate-400 inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(item.frontmatter.publishedAt)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1b4332] transition-colors line-clamp-2">
                    {item.frontmatter.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.frontmatter.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[#2d6a4f] font-semibold">全レース予測テーブルを見る</span>
                  <ArrowRight className="h-4 w-4 text-[#1b4332] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
