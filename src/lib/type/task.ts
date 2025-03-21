export interface ITask {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
}

export type Tasks = ITask[];
