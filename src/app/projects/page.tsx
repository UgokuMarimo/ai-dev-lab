import Link from 'next/link';
import { getAllProjects } from '@/lib/mdx';
import { ArrowRight, Bot } from 'lucide-react';

export const metadata = {
  title: 'Projects | AI Dev Lab',
  description: 'AIモデル開発、自動化投票システム、各種AIプロダクトの実績一覧。',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Bot className="h-4 w-4" />
          <span>Projects & Products</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">AIプロジェクト一覧</h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          実践・検証を行っているAIプロダクトおよび自動化ツールのプロジェクト一覧です。
        </p>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 hover:border-emerald-500/40 transition-all duration-300 shadow-lg"
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

                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.frontmatter.title}
                  </Link>
                </h2>

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
                プロジェクト詳細を見る <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
