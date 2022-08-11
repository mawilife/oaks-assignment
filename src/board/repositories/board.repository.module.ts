import { Module } from "@nestjs/common";
import { IBoardRepository } from "./iboard.repository";
import { IPhaseRepository } from "./iphase.repository";
import { ITaskRepository } from "./itask.repository"
import { BoardRepository } from "./memory/board-memory.repository";
import { PhaseMemoryRepository } from "./memory/phase-memory.repository";
import { TaskMemoryRepository } from "./memory/task-memory.repository";
@Module({
  providers: [
    { provide: ITaskRepository, useClass: TaskMemoryRepository },
    { provide: IPhaseRepository, useClass: PhaseMemoryRepository },
    { provide: IBoardRepository, useClass: BoardRepository },
  ],
  exports: [ITaskRepository, IPhaseRepository, IBoardRepository]
})
export class BoardRepositoryModule { }