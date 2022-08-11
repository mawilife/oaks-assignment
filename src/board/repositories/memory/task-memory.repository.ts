import { Injectable } from "@nestjs/common";
import { Task } from "../../../models/task.model";
import { ITaskRepository } from "../itask.repository";
import { v4 as uuid } from "uuid"

@Injectable()
export class TaskMemoryRepository implements ITaskRepository {

  tasks = new Array<Task>();

  async getTask(id: string): Promise<Task> {
    const task = this.tasks.find(task => task.id == id && !task.isDeleted);
    return task;
  }

  async getTasksWithPhaseId(phaseId: string): Promise<Task[]> {
    return this.tasks.filter(task => task.phaseId == phaseId && !task.isDeleted);
  }
  async setTaskCompleted(id: string): Promise<boolean> {
    const task = this.tasks.find(task => task.id == id && !task.isDeleted);
    if (!task || task.isCompleted) {
      return false// TODO: it can give different error types for each scenario.
    }
    task.isCompleted = true;
    task.complatedAt = new Date();
    return true;
  }
  async createTasks(phaseId: string, tasks: Partial<Task>[]): Promise<Task[]> {

    const tasksForInsert = tasks.map(task => ({
      id: uuid(),
      text: task.text,
      order: task.order,
      createAt: new Date(),
      isCompleted: false,
      isDeleted: false,
      phaseId,
    } as Task))

    this.tasks.push(...tasksForInsert);
    return tasksForInsert;
  }

  async isAllTasksCompleted(phaseId: any): Promise<boolean> {
    const inCompletedTask = this.tasks.find(
      task => task.phaseId == phaseId
        && !task.isCompleted
        && !task.isDeleted
    );
    return !inCompletedTask;
  }

}