export interface ITimeEntry {
  id: string;
  taskIds: string[];
  taskTitles: string[];
  startTime: Date;
  endTime?: Date;
  duration: number;
  notes?: string;
}
