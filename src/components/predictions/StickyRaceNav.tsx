'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, ListFilter, X, ChevronRight } from 'lucide-react';

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
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

  useEffect(() => {
    // MDXのテキストからアンカーIDとレース名を抽出
    const regex = /<a id="(race-[^"]+)"><\/a>\s*### 🏁 ([^:]+:\s*[^Direct\n\r]+)/g;
    let match;
    const groups: { [keibajo: string]: RaceItem[] } = {};

    while ((match = regex.exec(content)) !== null) {
      const anchorId = match[1];
      const fullRaceName = match[2].trim();
      
      const keibajo = fullRaceName.substring(0, 2);
      const raceLabel = fullRaceName.split(':')[0].substring(2).trim();

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

    const handleScroll = () => {
      if (window.scrollY > 200) {
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
    setIsOpenMobileNav(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* PC用 画面追従型 (fixed) 右縦ナビゲーション */}
      <aside className="hidden xl:block fixed top-24 right-4 z-40 w-56">
        <div className="bg-white/95 backdrop-blur-md border border-slate-300 rounded-2xl p-4 shadow-lg space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
              <ListFilter className="h-4 w-4 text-[#1b4332]" />
              <span>全レース目次</span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">スクロール追従中</span>
          </div>

          {Object.keys(keibajoGroups).length === 0 ? (
            <div className="text-xs text-slate-400 py-2">目次を読み込み中...</div>
          ) : (
            Object.entries(keibajoGroups).map(([keibajo, races]) => (
              <div key={keibajo} className="space-y-1.5">
                <div className="text-[11px] font-bold text-[#1b4332] bg-[#e8f5e9] px-2 py-0.5 rounded border border-[#2d6a4f]/20 flex items-center justify-between">
                  <span>📍 {keibajo}競馬場</span>
                  <span className="text-[10px] text-[#2d6a4f]">{races.length}R</span>
                </div>
                <div className="grid grid-cols-4 gap-1 pt-0.5">
                  {races.map((race) => (
                    <button
                      key={race.id}
                      onClick={() => scrollToAnchor(race.id)}
                      className="text-xs py-1 px-1 rounded bg-slate-50 hover:bg-[#1b4332] hover:text-white text-slate-700 font-bold transition-all border border-slate-200 text-center active:scale-95 shadow-2xs"
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
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-extrabold text-white bg-[#1b4332] hover:bg-[#2d6a4f] rounded-xl transition-all shadow-xs border border-[#1b4332]"
            >
              <ArrowUp className="h-4 w-4" /> ページトップへ飛ぶ
            </button>
          </div>
        </div>
      </aside>

      {/* モバイル・スマホ用 右下固定浮遊ボタン＆メニュー */}
      {showTopBtn && (
        <div className="xl:hidden fixed bottom-6 right-4 z-50 flex flex-col gap-2 items-end">
          {/* レース目次トグルボタン */}
          <button
            onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
            className="p-3 bg-white text-[#1b4332] rounded-full shadow-xl border border-slate-300 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
          >
            {isOpenMobileNav ? <X className="h-5 w-5" /> : <ListFilter className="h-5 w-5" />}
          </button>

          {/* トップへ戻るボタン */}
          <button
            onClick={scrollToTop}
            aria-label="ページトップへ戻る"
            className="p-3 bg-[#1b4332] text-white rounded-full shadow-xl hover:bg-[#2d6a4f] transition-all flex items-center justify-center border border-white/30 active:scale-95"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* モバイル用 ドロワー目次表示 */}
      {isOpenMobileNav && (
        <div className="xl:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-xs bg-white h-full p-5 shadow-2xl overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <ListFilter className="h-4 w-4 text-[#1b4332]" />
                <span>レース目次ジャンプ</span>
              </div>
              <button onClick={() => setIsOpenMobileNav(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {Object.entries(keibajoGroups).map(([keibajo, races]) => (
              <div key={keibajo} className="space-y-2">
                <div className="text-xs font-bold text-[#1b4332] bg-[#e8f5e9] px-2.5 py-1 rounded-md border border-[#2d6a4f]/20">
                  📍 {keibajo}競馬場
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {races.map((race) => (
                    <button
                      key={race.id}
                      onClick={() => scrollToAnchor(race.id)}
                      className="text-xs py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-[#1b4332] hover:text-white font-bold text-slate-700 border border-slate-200 text-center"
                    >
                      {race.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-[#1b4332] rounded-xl"
              >
                <ArrowUp className="h-4 w-4" /> ページトップへ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
