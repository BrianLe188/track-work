import { MOCK_USER } from "@/constants/mocks/user";
import { IUser } from "@/lib/type/auth";
import { create } from "zustand";

interface IAuthState {
  auth: IUser | null;
  onSetAuth: (d: IUser) => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  auth: MOCK_USER,
  onSetAuth: (data: IUser) => set({ auth: data }),
}));
