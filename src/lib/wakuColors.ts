export interface WakuStyle {
  bg: string;
  text: string;
  border?: string;
}

export function getWakuStyle(waku: number): WakuStyle {
  switch (waku) {
    case 1:
      return { bg: 'bg-white', text: 'text-slate-900', border: 'border-slate-300' };
    case 2:
      return { bg: 'bg-slate-900', text: 'text-white' };
    case 3:
      return { bg: 'bg-red-600', text: 'text-white' };
    case 4:
      return { bg: 'bg-blue-600', text: 'text-white' };
    case 5:
      return { bg: 'bg-yellow-400', text: 'text-slate-950' };
    case 6:
      return { bg: 'bg-emerald-600', text: 'text-white' };
    case 7:
      return { bg: 'bg-orange-500', text: 'text-white' };
    case 8:
      return { bg: 'bg-pink-500', text: 'text-white' };
    default:
      return { bg: 'bg-slate-200', text: 'text-slate-800' };
  }
}

export function getMarkBadgeColor(mark: string): string {
  switch (mark) {
    case '◎':
      return 'bg-red-100 text-red-700 border-red-300 font-extrabold';
    case '○':
      return 'bg-blue-100 text-blue-700 border-blue-300 font-bold';
    case '▲':
      return 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
    case '△':
      return 'bg-emerald-100 text-emerald-700 border-emerald-300 font-medium';
    default:
      return 'bg-slate-100 text-slate-500 border-slate-200';
  }
}
