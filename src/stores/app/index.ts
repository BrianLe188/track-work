import {
  MOCK_PROJECT_CATEGORIES,
  MOCK_PROJECT_PRIORITIES,
  MOCK_PROJECT_STATUSES,
  MOCK_PROJECT_TAGS,
} from "@/constants/mocks/projects";
import {
  ProjectCategories,
  ProjectPriorities,
  ProjectStatuses,
  ProjectTags,
} from "@/lib/type/project";
import { create } from "zustand";

interface IAppStore {
  projectCategories: ProjectCategories;
  projectPriorities: ProjectPriorities;
  projectStatuses: ProjectStatuses;
  projectTags: ProjectTags;
}

export const useAppStore = create<IAppStore>((_set) => ({
  projectCategories: MOCK_PROJECT_CATEGORIES,
  projectPriorities: MOCK_PROJECT_PRIORITIES,
  projectStatuses: MOCK_PROJECT_STATUSES,
  projectTags: MOCK_PROJECT_TAGS,
}));
