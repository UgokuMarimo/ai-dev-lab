'use client';

import React from 'react';
import { Sparkles, Trophy, ChevronRight } from 'lucide-react';

interface FeaturedRace {
  raceId: string;
  venue: string;
  raceNumber: number;
  raceName: string;
  topHorseName: string;
  topHorseProb: number;
  ev?: number;
}

interface Props {
  featuredRaces: FeaturedRace[];
  onSelectRace?: (raceId: string) => void;
}

export default function FeaturedRaceHeader({ featuredRaces, onSelectRace }: Props) {
  if (!featuredRaces || featuredRaces.length === 0) return null;

  const handleClick = (raceId: string) => {
    if (onSelectRace) {
      onSelectRace(raceId);
    } else {
      const el = document.getElementById(raceId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500 fill-amber-400" />
          本日のAI厳選・勝負レース Top {featuredRaces.length}
        </h2>
        <span className="text-xs text-slate-500 font-medium">期待値(EV)高確率厳選</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {featuredRaces.map((r, idx) => (
          <button
            key={r.raceId}
            onClick={() => handleClick(r.raceId)}
            className="text-left bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-bl-lg">
              勝負 #{idx + 1}
            </div>

            <div className="text-xs font-bold text-[#1b4332] flex items-center gap-1">
              <span>{r.venue}{r.raceNumber}R</span>
            </div>

            <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#1b4332] transition-colors truncate mt-0.5">
              {r.raceName}
            </div>

            <div className="text-xs text-slate-600 mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
              <span>
                ◎ <strong className="text-slate-900">{r.topHorseName}</strong>
              </span>
              <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                勝率 {r.topHorseProb.toFixed(1)}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
