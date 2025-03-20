import { LucideIcon } from "lucide-react";

export interface IProject {
  _id: string;
  name: string;
  thumbnail?: string;
  icon?: LucideIcon;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectTarget extends IProject {
  progress: number;
  activeMembers: number;
  completedTasks: number;
  totalTasks: number;
  starred: boolean;
}

export interface ICreateProject extends Omit<IProject, '_id' | 'icon' | 'createdAt' | 'updatedAt'>{
  category: string;
  startDate: Date;
  endDate?: Date;
  priority: string;
  teamMembers: string[];
  tags?: string[];
  isPublic?: boolean;
  repositoryUrl?: string;
}

export type Projects = IProject[];

export interface IProjectCategory {
  _id: string;
  name: string;
  key: string;
}

export type ProjectCategories = IProjectCategory[];

export interface IProjectPriority {
  _id: string;
  name: string;
}

export type ProjectPriorities = IProjectPriority[];

export interface IProjectStatus {
  _id: string;
  name: string;
}

export type ProjectStatuses = IProjectStatus[];

export interface IProjectTag {
  _id: string;
  name: string;
}

export type ProjectTags = IProjectTag[];
