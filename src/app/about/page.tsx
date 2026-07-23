import { SITE_CONFIG } from '@/lib/constants';
import { Target, Flag, Rocket, CheckCircle2, Cpu } from 'lucide-react';

export const metadata = {
  title: 'About | AI Dev Lab',
  description: 'AIを活用した個人開発が副業になり得るか検証するプロジェクトの目的とプロフィール。',
};

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-800 pb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Target className="h-3.5 w-3.5" />
          <span>Mission & Vision</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          好きな仕事だけをして自由に暮らす。
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          AIモデル開発、自動化ツール構築、Webサービス個人開発を通じて、個人開発が副業・事業として自立できるかをリアルに検証するプロジェクトです。
        </p>
      </div>

      {/* Main Goal Section */}
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Flag className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-white">プロジェクトの最終目標</h2>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          私の目標は非常にシンプルです。それは**「好きな仕事だけをして自由に暮らすこと」**。
          その手段として、最新のAI技術（LLM, 機械学習, 自動化スクリプト）を活用した個人開発を行い、コンテンツ発信（ブログ・GitHub・YouTube・X）と組み合わせて副業・事業としての再現性を高めていきます。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">検証軸 1</div>
            <div className="text-sm font-semibold text-white">AIモデル開発 & 自動化運用</div>
            <div className="text-xs text-slate-400">競馬AIを筆頭とした期待値モデルと自動投票</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <div className="text-xs text-teal-400 font-bold uppercase tracking-wider">検証軸 2</div>
            <div className="text-sm font-semibold text-white">Webサービス & コンテンツ資産化</div>
            <div className="text-xs text-slate-400">Next.jsベースの技術メディア・SEO・ポートフォリオ</div>
          </div>
        </div>
      </section>

      {/* Project Status */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Rocket className="h-5 w-5 text-emerald-400" />
          現在進行中の取り組み
        </h2>

        <div className="space-y-4">
          <div className="flex gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm">第一弾：競馬AI予測＆自動投票システムの運用検証</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                モデル開発・自動投票・GitHub管理まで完成。現在は実運用のなかで回収率、的中率、モデル改善、直前オッズ変動の影響を定量評価中。
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm">ポートフォリオメディアの構築とマルチチャネル発信</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                単なる日記ではなく「AI開発者の活動記録・ポートフォリオ」としてサイトを構築。YouTube、X、GitHubと連動して過程を発信。
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <Cpu className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm">新規AIツール・Webサービスの企画</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                競馬AIで培ったモデル構築・データ自動化・Web運用の技術をベースに、他のジャンルの個人開発サービスを展開予定。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
