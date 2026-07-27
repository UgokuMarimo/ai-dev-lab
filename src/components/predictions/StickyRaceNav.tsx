'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, ListFilter } from 'lucide-react';

interface RaceItem {
  id: string;
  name: string;
  keibajo: string;
}

interface StickyRaceNavProps {
  content: string;
}

export default function StickyRaceNav({ content }: StickyRaceNavProps) {
  const [keibajoGroups, setKeibajoGroups] = useState<{ [keibajo: string]: RaceItem[] }>({});
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    // MDXのテキストからアンカーIDとレース名を抽出
    const regex = /<a id="(race-[^"]+)"><\/a>\s*### 🏁 ([^:]+:\s*[^Direct\n\r]+)/g;
    let match;
    const groups: { [keibajo: string]: RaceItem[] } = {};

    while ((match = regex.exec(content)) !== null) {
      const anchorId = match[1];
      const fullRaceName = match[2].trim(); // 例: "札幌1R: 2歳未勝利"
      
      // 競馬場名抽出 (例: "札幌")
      const keibajo = fullRaceName.substring(0, 2);
      const raceLabel = fullRaceName.split(':')[0].substring(2).trim(); // 例: "1R"

      if (!groups[keibajo]) {
        groups[keibajo] = [];
      }
      groups[keibajo].push({
        id: anchorId,
        name: raceLabel,
        keibajo: keibajo,
      });
    }

    setKeibajoGroups(groups);

    // スクロール状態の検知
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* PC用 右縦固定のサイドナビゲーション */}
      <aside className="hidden xl:block w-56 flex-shrink-0">
        <div className="sticky top-24 bg-white/95 backdrop-blur-xs border border-slate-300 rounded-xl p-4 shadow-sm space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs border-b border-slate-200 pb-2">
            <ListFilter className="h-4 w-4 text-[#1b4332]" />
            <span>クイックレース移動</span>
          </div>

          {Object.keys(keibajoGroups).length === 0 ? (
            <div className="text-xs text-slate-400">目次を読み込み中...</div>
          ) : (
            Object.entries(keibajoGroups).map(([keibajo, races]) => (
              <div key={keibajo} className="space-y-1.5">
                <div className="text-[11px] font-bold text-[#1b4332] bg-[#e8f5e9] px-2 py-0.5 rounded border border-[#2d6a4f]/20">
                  📍 {keibajo}
                </div>
                <div className="grid grid-cols-4 gap-1 pt-0.5">
                  {races.map((race) => (
                    <button
                      key={race.id}
                      onClick={() => scrollToAnchor(race.id)}
                      className="text-xs py-1 px-1 rounded bg-slate-50 hover:bg-[#1b4332] hover:text-white text-slate-700 font-medium transition-colors border border-slate-200 text-center"
                      title={race.name}
                    >
                      {race.name}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}

          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-[#1b4332] bg-[#e8f5e9] hover:bg-[#2d6a4f] hover:text-white rounded-lg transition-colors border border-[#2d6a4f]/20"
            >
              <ArrowUp className="h-3.5 w-3.5" /> ページトップへ戻る
            </button>
          </div>
        </div>
      </aside>

      {/* スマホ・モバイル用 右下浮遊のトップへ戻るボタン */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="ページトップへ戻る"
          className="xl:hidden fixed bottom-6 right-6 z-50 p-3 bg-[#1b4332] text-white rounded-full shadow-lg hover:bg-[#2d6a4f] transition-all flex items-center justify-center border border-white/30"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
