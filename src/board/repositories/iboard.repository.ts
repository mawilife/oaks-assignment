import { Board } from "../../models/board.model";

export const IBoardRepository = Symbol("IBoardRepository");

export interface IBoardRepository {
  getBoard(id: string): Promise<Board>
  findAll(): Promise<Board[]> //TODO: pagination can be added
  createNewBoard(board: Partial<Board>): Promise<Board>;
}