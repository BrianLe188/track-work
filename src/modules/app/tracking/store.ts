import { MOCK_TASKS } from "@/constants/mocks/tasks";
import { Tasks } from "@/lib/type/task";
import { create } from "zustand";
import { ITimeEntry } from "./type";

interface ITrackingState {
  isTracking: boolean;
  todayTotal: number;
  elapsedTime: number;
  notes: string;
  tasks: Tasks;
  currentEntry: ITimeEntry | null;
  timeEntries: ITimeEntry[];
  onSetIsTracking: (isTracking: boolean) => void;
  onSetTodayTotal: (todayTotal: number) => void;
  onSetNotes: (notes: string) => void;
  onSetElapsedTime: (elapsedTime: number) => void;
  onIncreaseElapsedTime: () => void;
  onSetCurrentEntry: (currentEntry: ITimeEntry | null) => void;
  onAddTimeEntries: (timeEntries: ITimeEntry) => void;
}

export const useTrackingStore = create<ITrackingState>((set) => ({
  isTracking: false,
  todayTotal: 0,
  elapsedTime: 0,
  notes: "",
  tasks: MOCK_TASKS,
  currentEntry: null,
  timeEntries: [],
  onSetIsTracking: (isTracking) =>
    set({
      isTracking,
    }),
  onSetTodayTotal: (todayTotal) => set({ todayTotal }),
  onSetNotes: (notes) => set({ notes }),
  onSetElapsedTime: (elapsedTime) => set({ elapsedTime }),
  onIncreaseElapsedTime: () =>
    set((state) => ({
      elapsedTime: state.elapsedTime + 1,
    })),
  onSetCurrentEntry: (currentEntry) => set({ currentEntry }),
  onAddTimeEntries: (timeEntries) =>
    set((state) => ({
      timeEntries: [...state.timeEntries, timeEntries],
    })),
}));
