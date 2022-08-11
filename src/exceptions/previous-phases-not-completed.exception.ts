import { ApolloError } from "apollo-server-express";

export class PreviousPhasesNotCompletedException extends ApolloError {
  name = "PreviousPhasesNotCompletedException"
  constructor() {
    super("Previous phases needs to be completed before the task", "PREVIOUS_PHASES_NOT_COMPLETED");
  }
}