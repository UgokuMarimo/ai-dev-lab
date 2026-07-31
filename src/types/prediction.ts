export interface RunnerPrediction {
  waku: number;
  umaban: number;
  mark: '◎' | '○' | '▲' | '△' | '✕' | '－' | string;
  horseName: string;
  jockey?: string;
  winProb: number; // e.g. 24.6 (%)
  odds: number;    // e.g. 6.5
  ev: number;      // e.g. 1.60
  isTargetBet?: boolean; // EV >= 1.8 & prob >= 10%
}

export interface RacePredictionData {
  id: string; // e.g. "race-202601010201"
  venue: string; // e.g. "札幌"
  raceNumber: number; // e.g. 1
  raceName: string; // e.g. "2歳未勝利"
  startTime?: string; // e.g. "10:05"
  distance?: string; // e.g. "芝1200m"
  trackCondition?: string; // e.g. "良"
  isFeatured?: boolean;
  featuredComment?: string;
  runners: RunnerPrediction[];
}

export interface PredictionDayData {
  dateStr: string; // e.g. "2026-07-26"
  title: string;
  subtitle?: string;
  venues: string[]; // e.g. ["札幌", "新潟", "中京"]
  featuredRaces: {
    raceId: string;
    venue: string;
    raceNumber: number;
    raceName: string;
    topHorseName: string;
    topHorseProb: number;
  }[];
  races: RacePredictionData[];
}
