import { ApolloError } from "apollo-server-express";

export class PhaseNotFoundException extends ApolloError {
  name = "PhaseNotFoundException"
  constructor() {
    super("Requested phase is not found", "PHASE_NOT_FOUND");
  }
}