'use client';

import React, { useState } from 'react';
import { MapPin, Sparkles, ChevronRight } from 'lucide-react';

interface RaceItem {
  id: string;
  raceNumber: number;
  raceName: string;
  isFeatured?: boolean;
}

interface VenueRaces {
  venue: string;
  races: RaceItem[];
}

interface Props {
  venueData: VenueRaces[];
  activeVenue: string;
  onSelectVenue: (venue: string) => void;
  onSelectRace?: (raceId: string) => void;
}

export default function VenueRaceSelector({
  venueData,
  activeVenue,
  onSelectVenue,
  onSelectRace,
}: Props) {
  const currentVenueObj = venueData.find((v) => v.venue === activeVenue) || venueData[0];

  const handleRaceClick = (raceId: string) => {
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
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800 space-y-4">
      {/* 開催競馬場タブ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
          <MapPin className="h-3.5 w-3.5 text-[#2d6a4f]" /> 開催場:
        </span>
        {venueData.map((v) => {
          const isActive = v.venue === activeVenue;
          return (
            <button
              key={v.venue}
              onClick={() => onSelectVenue(v.venue)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50 scale-[1.02]'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{v.venue}競馬場</span>
              <span className="text-xs opacity-75 font-normal">({v.races.length}R)</span>
            </button>
          );
        })}
      </div>

      {/* レースナビゲーション (1R 〜 12R) */}
      {currentVenueObj && (
        <div className="space-y-2 pt-1 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
            <span>レース選択 ({currentVenueObj.venue})</span>
            <span className="text-[11px] text-amber-400 inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> ★＝勝負レース
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
            {currentVenueObj.races.map((r) => (
              <button
                key={r.id}
                onClick={() => handleRaceClick(r.id)}
                className={`py-2 px-1.5 rounded-lg text-center transition-all flex flex-col items-center justify-center border relative group ${
                  r.isFeatured
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/60'
                    : 'bg-slate-800/80 border-slate-700/60 text-slate-200 hover:bg-slate-700 hover:border-slate-500'
                }`}
              >
                {r.isFeatured && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </span>
                )}
                <span className="text-xs font-black tracking-tight">{r.raceNumber}R</span>
                <span className="text-[10px] truncate max-w-[54px] opacity-80 group-hover:opacity-100">
                  {r.raceName.replace(/3歳未勝利|2歳未勝利|1勝クラス|2勝クラス|3勝クラス/g, '') || r.raceName}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
