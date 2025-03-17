export interface IActivity {
  _id: string;
  user: string;
  avatar: string;
  action: string;
  createdAt: string;
  updatedAt: string;
}

export type Activities = IActivity[];
