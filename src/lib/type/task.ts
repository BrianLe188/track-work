export interface ITask {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
}

export type Tasks = ITask[];
