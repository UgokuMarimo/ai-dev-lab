'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Sparkles, TrendingUp } from 'lucide-react';

export default function AuthorSidebar() {
  return (
    <aside className="hidden xl:block fixed top-24 left-4 2xl:left-12 z-30 w-60">
      <div className="bg-white/95 backdrop-blur-md border border-slate-300 rounded-2xl p-5 shadow-sm space-y-4 text-slate-800">
        {/* Author Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] flex items-center justify-center text-white text-xl font-black shadow-inner flex-shrink-0 border-2 border-emerald-400/40">
            毬
          </div>
          <div>
            <div className="font-extrabold text-sm text-slate-900 leading-tight">
              うごく毬藻
            </div>
            <div className="text-[11px] font-bold text-[#2d6a4f] flex items-center gap-1 mt-0.5">
              <Sparkles className="h-3 w-3 text-emerald-500" />
              <span>AIエンジニア / 競馬予測</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 leading-relaxed border-t border-b border-slate-100 py-3">
          「好きな仕事だけをして自由に暮らす」を目指すAI開発者。回収率100%超の競馬AIモデルの自動化・検証結果を発信中。
        </p>

        {/* Action Links */}
        <div className="space-y-2 pt-1">
          <a
            href="https://x.com/UgokuMarimoAI"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs"
          >
            <span>X (@UgokuMarimoAI)</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <Link
            href="/predictions"
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-[#1b4332] bg-[#e8f5e9] hover:bg-[#2d6a4f] hover:text-white rounded-xl transition-all border border-[#2d6a4f]/20"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>最新のAI競馬予測</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
