import { MOCK_USER } from "@/constants/mocks/user";
import AuthEvent from "@/events/auth";
import { IUser } from "@/lib/type/auth";
import { create } from "zustand";

interface IAuthState {
  auth: IUser | null;
  onSetAuth: (d: IUser) => void;
  onLogout: () => Promise<void>;
  onCheckAuth: () => Promise<IUser | null>;
}

export const useAuthStore = create<IAuthState>((set) => ({
  auth: null,
  onSetAuth: (auth: IUser) => set({ auth }),
  onLogout: async () => {
    AuthEvent.logout();
    set({ auth: null });
  },
  onCheckAuth: async () => {
    try {
      const auth = (await AuthEvent.checkAuth()) || MOCK_USER;

      if (auth) {
        set({ auth });
        return auth;
      }

      return null;
    } catch (error) {
      return null;
    }
  },
}));
