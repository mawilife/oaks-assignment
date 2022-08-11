import { Inject, Injectable } from "@nestjs/common";
import { PhaseNotFoundException } from "src/exceptions/phase-not-found.exeption";
import { Phase } from "../..//models/phase.model";
import { IPhaseRepository } from "../repositories/iphase.repository";
import { TaskService } from "./task.service";

@Injectable()
export class PhaseService {
  constructor(
    @Inject(IPhaseRepository) private readonly phaseRepository: IPhaseRepository,
    private readonly taskService: TaskService,
  ) { }

  public async getPhase(id: string): Promise<Phase> {
    const phase = this.phaseRepository.getPhase(id);
    if (!phase) {
      throw new PhaseNotFoundException();
    }
    return phase;
  }

  public async getPhases(boardId: string): Promise<Phase[]> {
    const phases = await this.phaseRepository.getPhasesWithBoardId(boardId);
    return phases;
  }


  public async createPhase(phase: Partial<Phase>): Promise<Phase> {
    const result = await this.phaseRepository.createPhase(phase);
    return result;
  }

  public async updatePhaseCompletationStatus(phaseId): Promise<void> {
    const isAllTaskCompleted = await this.taskService.isAllTasksCompleted(phaseId);
    //TODO: Could be check if the phase is already in correct status before updating
    await this.phaseRepository.setPhaseCompletionStatus(phaseId, isAllTaskCompleted);
  }

  public async isAllPreviousPhasesCompleted(phaseId: string): Promise<boolean> {
    const result = await this.phaseRepository.isAllPreviousPhasesCompleted(phaseId);
    return result;
  }


}