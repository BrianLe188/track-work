import { LucideIcon } from "lucide-react";

export interface IProject {
  _id: string;
  name: string;
  thumbnail?: string;
  icon?: LucideIcon;
  description?: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  activeMembers: number;
  completedTasks: number;
  totalTasks: number;
  starred: boolean;
}

export type Projects = IProject[];
