import Link from 'next/link';
import { getAllArticles, getAllProjects } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Bot, Sparkles, TrendingUp, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);
  const projects = getAllProjects();

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Solo Developer Lab & Portfolio</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            AIを使った個人開発は
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              副業になり得るのか。
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            「好きな仕事だけをして自由に暮らす」ことを目指すAIエンジニアの実験ログ。
            AIモデル開発、自動化投票システム、収益性検証のリアルなプログラミングと結果を記録・発信中。
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Bot className="h-4 w-4" />
              プロジェクトを見る
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-semibold hover:bg-slate-800 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Terminal className="h-4 w-4" />
              開発ログを読む
            </Link>
          </div>
        </div>

        {/* Feature Grid Banner */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-800/60">
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm space-y-2">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-200">第一弾: 競馬予測AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              LightGBM / PyTorch による期待値計算と完全自動投票システムを運用検証中。
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm space-y-2">
            <div className="h-10 w-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-3">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-200">リアルな数値検証</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              回収率・的中率・オッズ変動追従など、失敗や改善も含めてオープンに公開。
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm space-y-2">
            <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-200">長期運用のアーキテクチャ</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next.js, TypeScript, Docker, CI/CDを活用した再現可能な個人開発モデル。
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Featured Project</h2>
            <p className="text-sm text-slate-400 mt-1">現在進行中の開発・運用プロジェクト</p>
          </div>
          <Link href="/projects" className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
            すべてのプロジェクト <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 p-6 sm:p-8 hover:border-emerald-500/40 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      {project.frontmatter.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                      Status: {project.frontmatter.status}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      {project.frontmatter.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {project.frontmatter.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.frontmatter.techStack.map((tech) => (
                      <span key={tech} className="text-xs px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics Card */}
                {project.frontmatter.metrics && (
                  <div className="grid grid-cols-3 md:flex md:flex-col gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 min-w-[200px]">
                    {project.frontmatter.metrics.map((m) => (
                      <div key={m.label} className="text-center md:text-left">
                        <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                          {m.label}
                        </div>
                        <div className="text-sm font-bold text-emerald-400 mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800/60 flex items-center justify-end">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                >
                  詳細・開発ドキュメントを見る <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Recent Development Logs</h2>
            <p className="text-sm text-slate-400 mt-1">最新の開発日記・技術ドキュメント</p>
          </div>
          <Link href="/articles" className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
            すべての記事を見る <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col justify-between rounded-xl bg-slate-900/60 border border-slate-800/80 p-6 hover:border-slate-700 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 font-medium">
                    {article.frontmatter.category}
                  </span>
                  <time dateTime={article.frontmatter.publishedAt}>
                    {formatDate(article.frontmatter.publishedAt)}
                  </time>
                </div>

                <h3 className="font-bold text-lg text-white hover:text-emerald-400 transition-colors line-clamp-2">
                  <Link href={`/articles/${article.slug}`}>
                    {article.frontmatter.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {article.frontmatter.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {article.frontmatter.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[11px] text-slate-500">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
                >
                  読む <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
