export interface IActivity {
  _id: string;
  user: string;
  avatar: string;
  action: string;
  time: string;
}

export type Activities = IActivity[];
