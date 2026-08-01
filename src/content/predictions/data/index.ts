import { PredictionDayData } from '@/types/prediction';
import { predictionDay20260725 } from './2026-07-25';
import { predictionDay20260726 } from './2026-07-26';

export const predictionsMap: Record<string, PredictionDayData> = {
  '2026-07-25': predictionDay20260725,
  '2026-07-25-keiba-ai-predictions': predictionDay20260725,
  '2026-07-26': predictionDay20260726,
  '2026-07-26-keiba-ai-predictions': predictionDay20260726,
};

export function getPredictionDayDataBySlug(slug: string): PredictionDayData {
  const data = predictionsMap[slug];
  if (data) return data;
  // fallback to default latest
  return predictionDay20260726;
}
