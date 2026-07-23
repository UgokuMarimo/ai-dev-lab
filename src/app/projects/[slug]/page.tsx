import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getProjectSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Code2, Calendar } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ''),
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  if (!project) return { title: 'Not Found' };

  return {
    title: `${project.frontmatter.title} | AI Dev Lab`,
    description: project.frontmatter.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 space-y-8">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> プロジェクト一覧に戻る
      </Link>

      {/* Header */}
      <header className="space-y-6 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            {project.frontmatter.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
            Status: {project.frontmatter.status}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400 ml-auto">
            <Calendar className="h-3.5 w-3.5" />
            開発開始: {project.frontmatter.startDate}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          {project.frontmatter.title}
        </h1>

        <p className="text-base text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
          {project.frontmatter.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Code2 className="h-4 w-4 text-emerald-400" />
            <span>Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.frontmatter.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics Grid if available */}
        {project.frontmatter.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {project.frontmatter.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center sm:text-left"
              >
                <div className="text-xs text-slate-400 font-medium">{m.label}</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">{m.value}</div>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Project Content (MDX Rendered) */}
      <div className="prose prose-invert prose-emerald max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-code:text-emerald-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
        <MDXRemote source={project.content} />
      </div>
    </div>
  );
}
