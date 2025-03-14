import { MOCK_PROJECTS } from "@/constants/mocks/projects";
import { IProject, Projects } from "@/lib/type/project";
import { create } from "zustand";

interface IProjectState {
  projects: Projects;
  targetProject: IProject | null;
  onSetProjects: (p: Projects) => void;
  onSetTargetProject: (id: string) => void;
}

export const useProjectStore = create<IProjectState>((set) => ({
  projects: MOCK_PROJECTS,
  targetProject: MOCK_PROJECTS[0],
  onSetProjects: (projects: Projects) => set({ projects }),
  onSetTargetProject: (id: string) =>
    set((state) => ({
      targetProject: state.projects.find((p) => p._id === id),
    })),
}));
