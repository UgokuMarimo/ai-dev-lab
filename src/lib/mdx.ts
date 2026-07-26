import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleFrontmatter } from '@/types/article';
import { Project, ProjectFrontmatter } from '@/types/project';

const ARTICLES_PATH = path.join(process.cwd(), 'src/content/articles');
const PROJECTS_PATH = path.join(process.cwd(), 'src/content/projects');

// --- Articles ---

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_PATH)) return [];
  return fs.readdirSync(ARTICLES_PATH).filter((file) => /\.mdx?$/.test(file));
}

export function getArticleBySlug(slug: string): Article | null {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(ARTICLES_PATH, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as ArticleFrontmatter,
    content,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
      );
    });

  return articles;
}

// --- Projects ---

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_PATH)) return [];
  return fs.readdirSync(PROJECTS_PATH).filter((file) => /\.mdx?$/.test(file));
}

export function getProjectBySlug(slug: string): Project | null {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(PROJECTS_PATH, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.startDate).getTime() -
        new Date(a.frontmatter.startDate).getTime()
      );
    });

  return projects;
}

// --- Predictions ---

const PREDICTIONS_PATH = path.join(process.cwd(), 'src/content/predictions');

export function getPredictionSlugs(): string[] {
  if (!fs.existsSync(PREDICTIONS_PATH)) return [];
  return fs.readdirSync(PREDICTIONS_PATH).filter((file) => /\.mdx?$/.test(file));
}

export function getPredictionBySlug(slug: string): Article | null {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(PREDICTIONS_PATH, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as ArticleFrontmatter,
    content,
  };
}

export function getAllPredictions(): Article[] {
  const slugs = getPredictionSlugs();
  const predictions = slugs
    .map((slug) => getPredictionBySlug(slug))
    .filter((prediction): prediction is Article => prediction !== null)
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
      );
    });

  return predictions;
}
