import { MOCK_ACTIVITIES } from "@/constants/mocks/activities";
import { MOCK_MEMBERS } from "@/constants/mocks/members";
import { MOCK_TASKS } from "@/constants/mocks/tasks";
import { Activities } from "@/lib/type/activity";
import { Members } from "@/lib/type/member";
import { Tasks } from "@/lib/type/task";
import { create } from "zustand";

interface IHomeState {
  activities: Activities;
  tasks: Tasks;
  members: Members;
}

export const useHomeStore = create<IHomeState>((set) => ({
  activities: MOCK_ACTIVITIES,
  tasks: MOCK_TASKS,
  members: MOCK_MEMBERS,
  onSetActivities: (activities: Activities) => set({ activities }),
  onSetTasks: (tasks: Tasks) => set({ tasks }),
  onSetTeamMembers: (members: Members) => set({ members }),
}));
