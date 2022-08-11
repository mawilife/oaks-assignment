import { Task } from "../../models/task.model";


export const ITaskRepository = Symbol("ITaskRepository");

export interface ITaskRepository {
  getTask(id: string): Promise<Task>;
  getTasksWithPhaseId(phaseId: string): Promise<Task[]>;
  setTaskCompleted(id: string): Promise<boolean>;
  createTasks(phaseId: string, tasks: Array<Partial<Task>>): Promise<Task[]>;
  isAllTasksCompleted(phaseId): Promise<boolean>;
};