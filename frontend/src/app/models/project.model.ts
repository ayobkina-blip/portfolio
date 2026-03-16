export interface Project {
  id: number;
  title: string;
  description: string;
  short_desc: string;
  image: string | null;
  color: string;
  tags: string[];
  github_url: string | null;
  demo_url: string | null;
  featured: boolean;
  order: number;
}
