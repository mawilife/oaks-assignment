import { Inject, Injectable } from "@nestjs/common";
import { TaskNotFoundException } from "../../exceptions/task-not-found.exception";
import { Task } from "../..//models/task.model";
import { ITaskRepository } from "../repositories/itask.repository";

@Injectable()
export class TaskService {
  constructor(@Inject(ITaskRepository) private readonly taskRepository: ITaskRepository) { }


  public async getTask(id: string): Promise<Task> {
    const task = await this.taskRepository.getTask(id);
    if (!task) {
      throw new TaskNotFoundException();
    }
    return task;
  }

  public async getTasks(phaseId: string): Promise<Task[]> {
    const result = await this.taskRepository.getTasksWithPhaseId(phaseId);
    return result;
  }

  public async setTaskCompleted(id: string): Promise<void> {
    const result = await this.taskRepository.setTaskCompleted(id);
    if (!result) {
      throw new TaskNotFoundException();
    }
  }

  public async createTasks(phaseId: string, tasks: Array<Partial<Task>>) {
    const result = await this.taskRepository.createTasks(phaseId, tasks);
    return result;
  }

  public async isAllTasksCompleted(phaseId: string): Promise<boolean> {
    const result = await this.taskRepository.isAllTasksCompleted(phaseId);
    return result;
  }
}