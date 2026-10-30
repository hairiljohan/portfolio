export interface Skill {
  title: string;
  description: string;
}
export interface Hobby {
  name: string;
  description: string;
}
export interface ProjectImage {
  src: string;
  dark?: { src: string; width: number; height: number };
  alt: string;
  width: number;
  height: number;
  caption?: string;
}
export interface Project {
  id: string;
  title: string;
  category: string;
  link: string;
  description: string;
  tags: string[];
  image: ProjectImage;
  cover?: ProjectImage;
}
export interface NavItem {
  label: string;
  href: string;
}
