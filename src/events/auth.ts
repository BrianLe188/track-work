import EVENT_NAME from "@/constants/event-name";
import { ISignIn, IUser } from "@/lib/type/auth";
import { invoke } from "@tauri-apps/api/core";

async function signIn(payload: ISignIn): Promise<IUser> {
  const res = await invoke(EVENT_NAME.SIGN_IN, { ...payload });
  return res as IUser;
}

const AuthEvent = {
  signIn,
};

export default AuthEvent;
