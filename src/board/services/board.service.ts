import { Inject, Injectable } from "@nestjs/common";
import { BoardAndTaskInCompatibleException } from "../../exceptions/board-and-task-incompatible.exception";
import { BoardNotFoundException } from "../../exceptions/board-not-found.exception";
import { PreviousPhasesNotCompletedException } from "../../exceptions/previous-phases-not-completed.exception";
import { Board } from "../..//models/board.model";
import { IBoardRepository } from "../repositories/iboard.repository";
import { PhaseService } from "./phase.service";
import { TaskService } from "./task.service";

@Injectable()
export class BoardService {
  constructor(
    @Inject(IBoardRepository) private readonly boardRepository: IBoardRepository,
    private readonly taskService: TaskService,
    private readonly phaseService: PhaseService,
  ) { }

  async getBoard(id: string): Promise<Board> {
    const board = await this.boardRepository.getBoard(id);
    return board;
  }


  async findAll(): Promise<Board[]> {
    const boards = await this.boardRepository.findAll();
    return boards;
  }

  async setTaskComplete(boardId: string, taskId: string): Promise<Board> {
    const board = await this.getBoard(boardId);
    const task = await this.taskService.getTask(taskId);
    const phase = await this.phaseService.getPhase(task.phaseId);
    if (phase.boardId != boardId) {
      throw new BoardAndTaskInCompatibleException();
    }

    const isAllPreviousPhasesCompleted = await this.phaseService.isAllPreviousPhasesCompleted(phase.id);
    if (!isAllPreviousPhasesCompleted) {
      throw new PreviousPhasesNotCompletedException();
    }
    await this.taskService.setTaskCompleted(taskId);
    await this.phaseService.updatePhaseCompletationStatus(phase.id);
    return board //its not necassary but i put to see the result on calling this service
  }

  async createBoard(board: Partial<Board>): Promise<Board> {
    const createdBoard = await this.boardRepository.createNewBoard(board);
    const promises = board.phases.map(async phase => {
      const createdPhase = await this.phaseService.createPhase({ ...phase, boardId: createdBoard.id });
      const tasks = await this.taskService.createTasks(createdPhase.id, phase.tasks);
      createdPhase.tasks = tasks;
      return createdPhase;
    })
    createdBoard.phases = await Promise.all(promises);
    return createdBoard;
  }
}