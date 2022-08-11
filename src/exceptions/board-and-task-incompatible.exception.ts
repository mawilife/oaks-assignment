import { ApolloError } from "apollo-server-express";

export class BoardAndTaskInCompatibleException extends ApolloError {
  name = "BoardAndTaskInCompatibleException"
  constructor() {
    super("Requested board id not compatible with given task id", "BOARD_AND_TASK_NOT_COMPATIBLE");
  }
}