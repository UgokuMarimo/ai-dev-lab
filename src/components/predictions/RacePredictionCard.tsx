'use client';

import React from 'react';
import { RacePredictionData } from '@/types/prediction';
import { getWakuStyle, getMarkBadgeColor } from '@/lib/wakuColors';
import { Sparkles, Trophy, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  race: RacePredictionData;
}

export default function RacePredictionCard({ race }: Props) {
  if (!race || !race.runners) {
    return null;
  }

  // 最高勝率馬・最高EV馬
  const topProbRunner = [...race.runners].sort((a, b) => b.winProb - a.winProb)[0];
  const targetBetRunner = race.runners.find((r) => r.isTargetBet || (r.ev >= 1.8 && r.winProb >= 10));

  return (
    <section
      id={race.id}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md my-6"
    >
      {/* レースヘッダー */}
      <div className="bg-slate-900 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-600 text-white font-extrabold text-sm rounded-lg shadow-xs">
            {race.venue}{race.raceNumber}R
          </span>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-white leading-tight flex items-center gap-2">
              {race.raceName}
              {race.isFeatured && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  <Sparkles className="h-3 w-3" /> 勝負レース
                </span>
              )}
            </h3>
            <div className="text-xs text-slate-400 flex flex-wrap gap-2 mt-0.5">
              {race.distance && <span>{race.distance}</span>}
              {race.trackCondition && <span>・ 馬場: {race.trackCondition}</span>}
              {race.startTime && <span>・ 発走 {race.startTime}</span>}
            </div>
          </div>
        </div>

        {/* AI購入判定バナー */}
        <div>
          {targetBetRunner ? (
            <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-emerald-300 font-bold">AI購入推奨: </span>
                <span className="font-extrabold text-white">{targetBetRunner.umaban}番 {targetBetRunner.horseName}</span>
                <span className="text-emerald-400 font-bold ml-1.5">(EV: {targetBetRunner.ev.toFixed(2)})</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-3 py-1 text-xs text-slate-400 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>EV≥1.8 適合なし (見送り)</span>
            </div>
          )}
        </div>
      </div>

      {/* 出馬表 ＆ AI予測スコア テーブル */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
              <th className="py-2.5 px-3 w-12 text-center">枠</th>
              <th className="py-2.5 px-3 w-12 text-center">馬番</th>
              <th className="py-2.5 px-3 w-14 text-center">印</th>
              <th className="py-2.5 px-4 font-extrabold">馬名</th>
              <th className="py-2.5 px-3 text-right">AI勝率</th>
              <th className="py-2.5 px-3 text-right">単勝オッズ</th>
              <th className="py-2.5 px-3 text-right">期待値 (EV)</th>
              <th className="py-2.5 px-3 text-center">AI投票判定</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {race.runners.map((runner) => {
              const wakuStyle = getWakuStyle(runner.waku);
              const markStyle = getMarkBadgeColor(runner.mark);
              const isTarget = runner.isTargetBet || (runner.ev >= 1.8 && runner.winProb >= 10);

              return (
                <tr
                  key={runner.umaban}
                  className={`transition-colors ${
                    isTarget
                      ? 'bg-emerald-50/70 font-semibold text-slate-900'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  {/* 枠番 */}
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center h-6 w-6 rounded-md font-extrabold text-xs shadow-2xs ${wakuStyle.bg} ${wakuStyle.text} ${wakuStyle.border || ''}`}
                    >
                      {runner.waku}
                    </span>
                  </td>

                  {/* 馬番 */}
                  <td className="py-2.5 px-3 text-center font-black text-sm">
                    {runner.umaban}
                  </td>

                  {/* 予想印 */}
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-md border text-xs ${markStyle}`}>
                      {runner.mark}
                    </span>
                  </td>

                  {/* 馬名 */}
                  <td className="py-2.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span>{runner.horseName}</span>
                      {runner.jockey && <span className="text-[11px] font-normal text-slate-500">({runner.jockey})</span>}
                    </div>
                  </td>

                  {/* AI勝率バー ＆ パーセント */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 sm:w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            runner.winProb >= 20 ? 'bg-emerald-600' : runner.winProb >= 15 ? 'bg-blue-600' : 'bg-slate-400'
                          }`}
                          style={{ width: `${Math.min(runner.winProb * 3, 100)}%` }}
                        ></div>
                      </div>
                      <span className="font-extrabold text-slate-900 w-12 text-right">
                        {runner.winProb.toFixed(1)}%
                      </span>
                    </div>
                  </td>

                  {/* 単勝オッズ */}
                  <td className="py-2.5 px-3 text-right font-semibold text-slate-700">
                    {runner.odds > 0 ? `${runner.odds.toFixed(1)}倍` : '-'}
                  </td>

                  {/* 期待値 (EV) */}
                  <td className="py-2.5 px-3 text-right">
                    <span
                      className={`font-black ${
                        runner.ev >= 1.8
                          ? 'text-emerald-700 text-sm font-extrabold'
                          : runner.ev >= 1.3
                          ? 'text-blue-600 font-bold'
                          : 'text-slate-500'
                      }`}
                    >
                      {runner.ev.toFixed(2)}
                    </span>
                  </td>

                  {/* AI投票判定 */}
                  <td className="py-2.5 px-3 text-center">
                    {isTarget ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-xs animate-pulse">
                        ★ 購入推奨
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">見送り</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
