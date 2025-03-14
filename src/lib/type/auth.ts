export interface ISignIn {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
}
