import { create } from "zustand";
import { SAMPLE_PROJECTS } from "./constants";

interface IManageProjectState {
  projects: any[];
  visibleColumns: string[];
  selectedProjects: string[];
  onSelectVisibleColumns: (col: string) => void;
  onSelectedProjects: (id: string) => void;
  onSelectAllProjects: () => void;
  onResetSelectedProjects: () => void;
}

// const allVisibleColumns = [
//   "name",
//   "status",
//   "priority",
//   "progress",
//   "team",
//   "dueDate",
//   "actions",
// ];

export const useManageProjectStore = create<IManageProjectState>((set) => ({
  projects: SAMPLE_PROJECTS,
  visibleColumns: ["name", "priority", "progress", "actions"],
  selectedProjects: [],
  onSelectVisibleColumns: (col) =>
    set((state) => ({
      visibleColumns: state.visibleColumns.includes(col)
        ? state.visibleColumns.filter((_col) => _col !== col)
        : [...state.visibleColumns, col],
    })),
  onSelectedProjects: (id) =>
    set((state) => ({
      selectedProjects: state.selectedProjects.includes(id)
        ? state.selectedProjects.filter((_col) => _col !== id)
        : [...state.selectedProjects, id],
    })),
  onSelectAllProjects: () =>
    set((state) => ({
      selectedProjects: state.projects.map((proj) => proj._id),
    })),
  onResetSelectedProjects: () => set({ selectedProjects: [] }),
}));
