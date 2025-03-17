import EVENT_NAME from "@/constants/event-name";
import { ISignIn, IUser } from "@/lib/type/auth";
import { invoke } from "@tauri-apps/api/core";
import { emit } from "@tauri-apps/api/event";

async function signIn(payload: ISignIn): Promise<IUser> {
  const res = await invoke(EVENT_NAME.SIGN_IN, { ...payload });
  return res as IUser;
}

function logout() {
  emit(EVENT_NAME.LOGOUT);
}

async function checkAuth(): Promise<IUser> {
  const res = await invoke(EVENT_NAME.CHECK_AUTH);
  return res as IUser;
}

const AuthEvent = {
  signIn,
  logout,
  checkAuth,
};

export default AuthEvent;
