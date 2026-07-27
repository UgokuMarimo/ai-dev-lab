'use client';

import React, { useEffect, useState } from 'react';
import { ListFilter, ArrowUp } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTocSidebarProps {
  content: string;
}

export default function ArticleTocSidebar({ content }: ArticleTocSidebarProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // MDXの見出し (# H1, ## H2, ### H3) を抽出
    const lines = content.split('\n');
    const items: TocItem[] = [];

    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h2Match) {
        const text = h2Match[1].replace(/[*_#~`]/g, '').trim();
        const id = text.toLowerCase().replace(/[^\w\u3000-\u30fe\u4e00-\u9fa5]+/g, '-');
        items.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].replace(/[*_#~`]/g, '').trim();
        const id = text.toLowerCase().replace(/[^\w\u3000-\u30fe\u4e00-\u9fa5]+/g, '-');
        items.push({ id, text, level: 3 });
      }
    });

    setToc(items);

    // スクロールで見出し要素の位置を監視
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2, h3');
      let currentId = '';

      headings.forEach((heading) => {
        const top = heading.getBoundingClientRect().top;
        if (top <= 120) {
          currentId = heading.id || heading.textContent?.toLowerCase().replace(/[^\w\u3000-\u30fe\u4e00-\u9fa5]+/g, '-') || '';
        }
      });

      if (currentId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  const scrollToHeading = (text: string) => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    const target = headings.find(h => h.textContent?.includes(text) || text.includes(h.textContent || ''));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (toc.length === 0) return null;

  return (
    <aside className="hidden xl:block fixed top-24 right-4 2xl:right-12 z-30 w-60">
      <div className="bg-white/95 backdrop-blur-md border border-slate-300 rounded-2xl p-4 shadow-sm space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
            <ListFilter className="h-4 w-4 text-[#1b4332]" />
            <span>目次 (Index)</span>
          </div>
        </div>

        <nav className="space-y-1 text-xs">
          {toc.map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToHeading(item.text)}
              className={`w-full text-left py-1.5 px-2 rounded-lg font-medium transition-all text-xs truncate block ${
                item.level === 3 ? 'pl-4 text-[11px]' : ''
              } ${
                activeId && item.text.includes(activeId)
                  ? 'bg-[#e8f5e9] text-[#1b4332] font-bold border-l-2 border-[#1b4332]'
                  : 'text-slate-600 hover:text-[#1b4332] hover:bg-slate-50'
              }`}
              title={item.text}
            >
              {item.text}
            </button>
          ))}
        </nav>

        <div className="pt-2 border-t border-slate-200">
          <button
            onClick={scrollToTop}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white bg-[#1b4332] hover:bg-[#2d6a4f] rounded-xl transition-all shadow-xs"
          >
            <ArrowUp className="h-3.5 w-3.5" /> ページトップへ戻る
          </button>
        </div>
      </div>
    </aside>
  );
}
