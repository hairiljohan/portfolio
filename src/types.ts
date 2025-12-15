import { LucideIcon } from "lucide-react";

export interface Skill {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface Hobby {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  link: string;
  description?: string;
  comingSoon?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
