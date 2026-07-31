'use client';

import React, { useState } from 'react';
import { PredictionDayData } from '@/types/prediction';
import VenueRaceSelector from './VenueRaceSelector';
import FeaturedRaceHeader from './FeaturedRaceHeader';
import RacePredictionCard from './RacePredictionCard';

interface Props {
  dayData: PredictionDayData;
}

export default function PredictionDashboard({ dayData }: Props) {
  const [activeVenue, setActiveVenue] = useState<string>(
    dayData.venues[0] || '新潟'
  );

  // 競馬場ごとのデータ構成
  const venueDataForSelector = dayData.venues.map((venue) => {
    const venueRaces = dayData.races.filter((r) => r.venue === venue);
    return {
      venue,
      races: venueRaces.map((r) => ({
        id: r.id,
        raceNumber: r.raceNumber,
        raceName: r.raceName,
        isFeatured: r.isFeatured,
      })),
    };
  });

  // アクティブな競馬場のレース一覧
  const currentVenueRaces = dayData.races.filter(
    (r) => r.venue === activeVenue
  );

  return (
    <div className="space-y-8">
      {/* AI厳選・勝負レース Top3 ハイライト */}
      <FeaturedRaceHeader featuredRaces={dayData.featuredRaces} />

      {/* 開催競馬場タブ ＆ 1R〜12R ナビゲーション */}
      <VenueRaceSelector
        venueData={venueDataForSelector}
        activeVenue={activeVenue}
        onSelectVenue={setActiveVenue}
      />

      {/* アクティブな競馬場のレース一覧 ＆ 出馬表カード */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            📍 {activeVenue}競馬場 AIレース予測一覧
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
            {currentVenueRaces.length} レース掲載
          </span>
        </div>

        {currentVenueRaces.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 text-sm">
            {activeVenue}競馬場の対象レースはありません。
          </div>
        ) : (
          currentVenueRaces.map((race) => (
            <RacePredictionCard key={race.id} race={race} />
          ))
        )}
      </div>
    </div>
  );
}
