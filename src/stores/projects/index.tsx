import { MOCK_PROJECTS } from "@/constants/mocks/projects";
import { IProjectTarget } from "@/lib/type/project";
import { create } from "zustand";

interface IProjectState {
  projects: IProjectTarget[];
  targetProject: IProjectTarget | null;
  onSetProjects: (p: IProjectTarget[]) => void;
  onSetTargetProject: (id: string) => void;
}

export const useProjectStore = create<IProjectState>((set) => ({
  projects: MOCK_PROJECTS,
  targetProject: MOCK_PROJECTS[0],
  onSetProjects: (projects: IProjectTarget[]) => set({ projects }),
  onSetTargetProject: (id: string) =>
    set((state) => ({
      targetProject: state.projects.find((p) => p._id === id) as IProjectTarget | null,
    })),
}));
