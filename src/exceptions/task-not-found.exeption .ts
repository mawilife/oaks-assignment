import { ApolloError } from "apollo-server-express";

export class TaskNotFoundException extends ApolloError {
  name = "TaskNotFoundException"
  constructor() {
    super("Requested taks is not found", "TASK_NOT_FOUND");
  }
}