import { Phase } from "../../models/phase.model";

export const IPhaseRepository = Symbol("IPhaseRepository");

export interface IPhaseRepository {
  getPhase(id: string): Promise<Phase>;
  getPhasesWithBoardId(boardId: string): Promise<Phase[]>;
  setPhaseCompletionStatus(id: string, isPhaseCompleted: boolean): Promise<boolean>;
  createPhase(phase: Partial<Phase>): Promise<Phase>
  isAllPreviousPhasesCompleted(phaseId: string): Promise<boolean>
}