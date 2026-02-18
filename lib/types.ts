export interface Project {
  slug: string;
  title: string;
  year: string;
  location: string;
  software: string;
  description: string;
  hidden: boolean;
  coverImage?: string;
  images: string[];
  createdAt: string;
  category?: string;
}

export type ProjectInput = Omit<Project, 'createdAt' | 'images'>;
