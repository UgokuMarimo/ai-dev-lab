import Link from 'next/link';
import { getAllPredictions } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Calendar, Trophy, ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'AI競馬予測ポータル | KeibaAI 予測アーカイブ',
  description: 'KeibaAIが毎開催日に算出する全レースのAI勝率予測および重賞・勝負レース予想ポータルです。',
};

export default function PredictionsPage() {
  const predictions = getAllPredictions();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span>KeibaAI Realtime Race Predictions</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          🏇 AI競馬予測ポータル 開催一覧
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          独自開発の機械学習AI（KeibaAI）が各開催日ごとに算出する全レースの勝率スコア・期待値(EV)・推奨買い目アーカイブです。
        </p>
      </section>

      {/* Predictions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-emerald-600" />
            開催日別 予測データベース ({predictions.length}件)
          </h2>
        </div>

        {predictions.length === 0 ? (
          <p className="text-slate-500 text-sm py-12 text-center bg-white rounded-2xl border border-slate-200">
            現在、競馬予測レポートはありません。
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {predictions.map((item) => (
              <Link
                key={item.slug}
                href={`/predictions/${item.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-emerald-500 transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-md bg-slate-900 text-white font-extrabold">
                      {item.frontmatter.category || 'AI競馬予想'}
                    </span>
                    <span className="text-slate-500 font-bold inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                      {formatDate(item.frontmatter.publishedAt)} 開催
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {item.frontmatter.title}
                  </h3>

                  {item.frontmatter.subtitle && (
                    <p className="text-xs font-semibold text-emerald-600 line-clamp-1">
                      {item.frontmatter.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.frontmatter.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    全32レース出馬表 ＆ AI予測勝率テーブルを見る
                  </span>
                  <div className="h-8 w-8 rounded-full bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
