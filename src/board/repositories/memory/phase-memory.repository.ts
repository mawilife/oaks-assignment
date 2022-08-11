import { Injectable } from "@nestjs/common";
import { Phase } from "../../../models/phase.model";
import { IPhaseRepository } from "../iphase.repository";
import { PhaseNotFoundException } from "../../../exceptions/phase-not-found.exeption"
import { MemoryRepositoryHelper } from "./memoryRepositoryHelper";

@Injectable()
export class PhaseMemoryRepository implements IPhaseRepository {


  phases = new Array<Phase>()

  async getPhase(id: string): Promise<Phase> {
    const phase = this.phases.find(phase => phase.id == id && !phase.isDeleted);
    return phase ? MemoryRepositoryHelper.copyData(phase) : null;
  }

  async getPhasesWithBoardId(boardId: string): Promise<Phase[]> {
    const phases = this.phases.filter(phase => phase.boardId == boardId && !phase.isDeleted);
    return MemoryRepositoryHelper.copyData(phases);
  }

  async setPhaseCompletionStatus(id: string, isPhaseCompleted: boolean): Promise<boolean> {
    const phase = this.phases.find(phase => phase.id == id && !phase.isDeleted);
    if (!phase) {
      return false;
    }
    phase.isCompleted = isPhaseCompleted;
    phase.complatedAt = isPhaseCompleted ? new Date() : null;
    return true;
  }

  async createPhase(phase: Partial<Phase>): Promise<Phase> {
    const phaseForInsert = {
      id: MemoryRepositoryHelper.createUniqeKey(),
      text: phase.text,
      order: phase.order,
      createAt: new Date(),
      isCompleted: false,
      isDeleted: false,
      boardId: phase.boardId,
    } as Phase

    this.phases.push(phaseForInsert);
    return MemoryRepositoryHelper.copyData(phaseForInsert);
  }

  async isAllPreviousPhasesCompleted(phaseId: string): Promise<boolean> {
    const targetPhase = this.phases.find(phase => phase.id == phaseId && !phase.isDeleted)
    if (!targetPhase) {
      throw new PhaseNotFoundException(); // It shouldn't be executed ever
    }
    const inCompletedPhase = this.phases.find(phase => !phase.isDeleted
      && phase.boardId == targetPhase.boardId
      && phase.order < targetPhase.order
      && !phase.isCompleted
    )
    return !inCompletedPhase;
  }

}