import { ApolloError } from "apollo-server-express";

export class ValidationException extends ApolloError {
  name = "ValidationException"
  constructor() {
    super("Given input is not valid", "GRAPHQL_VALIDATION_FAILED");
  }
}