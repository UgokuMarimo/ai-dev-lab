export interface ProjectFrontmatter {
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived' | 'in-development';
  category: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  startDate: string;
  featured?: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}
