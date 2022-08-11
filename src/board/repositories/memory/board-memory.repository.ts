import { Injectable } from "@nestjs/common";
import { Board } from "../../../models/board.model";
import { IBoardRepository } from "../iboard.repository";
import { MemoryRepositoryHelper } from "./memoryRepositoryHelper";


@Injectable()
export class BoardRepository implements IBoardRepository {
  boards = new Array<Board>();

  async getBoard(id: string): Promise<Board> {
    const board = this.boards.find(board => board.id == id && !board.isDeleted);
    return board ? MemoryRepositoryHelper.copyData(board) : null;

  }
  async findAll(): Promise<Board[]> {
    const boards = this.boards.filter(board => !board.isDeleted);
    return MemoryRepositoryHelper.copyData(boards);
  }
  async createNewBoard(board: Partial<Board>): Promise<Board> {
    const boardForInsert = {
      id: MemoryRepositoryHelper.createUniqeKey(),
      text: board.text,
      isDeleted: false,
      createAt: new Date(),

    } as Board
    this.boards.push(boardForInsert);
    return MemoryRepositoryHelper.copyData(boardForInsert);
  }

}