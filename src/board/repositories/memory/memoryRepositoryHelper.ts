import { v4 as uuid } from "uuid"
export class MemoryRepositoryHelper {
  private constructor() { }
  static createUniqeKey() {
    return uuid();
  }

  static copyData<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));//TODO this could be improved
  }
}