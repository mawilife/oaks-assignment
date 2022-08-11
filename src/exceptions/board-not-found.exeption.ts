import { ApolloError } from "apollo-server-express";

export class BoardNotFoundException extends ApolloError {
  name = "BoardNotFoundException"
  constructor() {
    super("Requested board is not found", "BOARD_NOT_FOUND");
  }
}