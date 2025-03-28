import { LucideIcon } from "lucide-react";
import { IProjectTarget } from "./project";

export interface INavMainItem {
  title: string;
  url: string;
}

export interface INavMain {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items: INavMainItem[];
}

export interface ISidebar {
  navMain: INavMain[];
  projects: IProjectTarget[];
}
