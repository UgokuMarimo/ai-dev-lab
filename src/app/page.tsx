import Link from 'next/link';
import { getAllArticles, getAllProjects } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';
import { ArrowRight, BookOpen, Bot, User, Sparkles, Tag, Clock } from 'lucide-react';

export default function HomePage() {
  const articles = getAllArticles();
  const projects = getAllProjects();
  const mainProject = projects.find((p) => p.slug === 'keiba-ai') || projects[0];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Blog Top Banner / Concept Card */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-8 sm:p-10 text-white shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-100 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Solo Developer Verification Blog</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          AIを使った個人開発は
          <br className="hidden sm:inline" />
          副業になり得るのか。
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
          「好きな仕事だけをして自由に暮らす」ことを目指すAIエンジニアの活動記録。
          AIモデル開発・自動化システム・収益性検証のリアルな試行錯誤をすべて発信中。
        </p>
      </section>

      {/* Main Grid Layout (Blog Feed + Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Articles List (Main Blog Feed) */}
        <main className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              最新の開発ログ・記事
            </h2>
            <span className="text-xs text-slate-500 font-medium">全 {articles.length} 件</span>
          </div>

          <div className="space-y-6">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      {article.frontmatter.category}
                    </span>
                    <span className="text-slate-400 inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <time dateTime={article.frontmatter.publishedAt}>
                        {formatDate(article.frontmatter.publishedAt)}
                      </time>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                    <Link href={`/articles/${article.slug}`}>
                      {article.frontmatter.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {article.frontmatter.description}
                  </p>
                </div>

                {/* Footer / Tags & Read More */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {article.frontmatter.tags.map((tag) => (
                      <span key={tag} className="text-xs text-slate-500 inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                        <Tag className="h-3 w-3 text-slate-400" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 inline-flex items-center gap-1 shrink-0"
                  >
                    続きを読む <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Column: Sidebar (Profile & Main Project) */}
        <aside className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg border border-emerald-200 shrink-0">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{SITE_CONFIG.author.name}</h3>
                <p className="text-xs text-slate-500">{SITE_CONFIG.author.role}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {SITE_CONFIG.author.bio}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">検証テーマ</span>
              <span className="font-bold text-emerald-600">AI×副業検証</span>
            </div>
          </div>

          {/* Featured Project Widget */}
          {mainProject && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-emerald-600" />
                  第1弾 プロジェクト
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-700">
                  運用検証中
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-base">
                <Link href={`/projects/${mainProject.slug}`} className="hover:text-emerald-600 transition-colors">
                  {mainProject.frontmatter.title}
                </Link>
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {mainProject.frontmatter.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {mainProject.frontmatter.techStack.map((tech) => (
                  <span key={tech} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 text-right">
                <Link
                  href={`/projects/${mainProject.slug}`}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  開発ドキュメントを見る <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-slate-100/80 rounded-xl p-5 border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-800">各メディア・発信</h4>
            <div className="space-y-1.5 text-slate-600">
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between hover:text-emerald-600 py-1"
              >
                <span>GitHub (ソースコード管理)</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
