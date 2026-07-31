import Link from 'next/link';
import { getAllPredictions } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Calendar, Trophy, ArrowRight, Sparkles, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'AI競馬予測ポータル | KeibaAI 開催レース一覧',
  description: 'KeibaAIが毎開催日に算出する全レースのAI勝率予測および重賞・勝負レース予想ポータルです。',
};

export default function PredictionsPage() {
  const predictions = getAllPredictions();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header Banner (競馬ポータル風) */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span>KeibaAI Realtime Portal</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          🏇 AI競馬予測 レース開催日程ポータル
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          独自開発の機械学習AI（KeibaAI）が算出する全レースの予測勝率スコア・確定出馬表・期待値(EV≥1.8)適合馬アーカイブです。
        </p>
      </section>

      {/* 開催日別 レース日程・勝負レースポータル一覧 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-emerald-600" />
            開催日別 予想＆出馬表一覧 ({predictions.length}日分)
          </h2>
        </div>

        {predictions.length === 0 ? (
          <p className="text-slate-500 text-sm py-12 text-center bg-white rounded-2xl border border-slate-200">
            現在、開催予定の予測レポートはありません。
          </p>
        ) : (
          <div className="space-y-6">
            {predictions.map((item) => (
              <div
                key={item.slug}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden space-y-4 p-6 sm:p-8"
              >
                {/* 開催日ヘッダー */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-extrabold text-sm sm:text-base flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-emerald-400" />
                      {formatDate(item.frontmatter.publishedAt)} 開催
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                      全32レースAI予測掲載
                    </span>
                  </div>

                  <Link
                    href={`/predictions/${item.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all group"
                  >
                    <span>この日の全レース出馬表＆勝率を見る</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* 開催地タグ ＆ ピックアップ勝負レース */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" /> 本日の開催競馬場:
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['📍 札幌競馬場 (12R)', '📍 新潟競馬場 (12R)', '📍 中京競馬場 (12R)'].map((venue) => (
                      <span
                        key={venue}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 font-extrabold text-xs text-slate-800 border border-slate-200"
                      >
                        {venue}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 本日の勝負レースミニカード */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" /> 本日のAI最注目重賞＆勝負レース
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="font-extrabold text-slate-900">新潟7R 関屋記念 (GIII)</div>
                      <div className="text-slate-600 flex justify-between">
                        <span>◎ トゥードジアン</span>
                        <strong className="text-emerald-700">勝率 26.2%</strong>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="font-extrabold text-slate-900">中京3R 3歳未勝利</div>
                      <div className="text-slate-600 flex justify-between">
                        <span>◎ ダノンミッドナイト</span>
                        <strong className="text-emerald-700">勝率 24.6%</strong>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="font-extrabold text-slate-900">札幌12R 厚岸特別</div>
                      <div className="text-slate-600 flex justify-between">
                        <span>◎ ドルチェリターン</span>
                        <strong className="text-emerald-700">勝率 20.5%</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
