import { Args, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import { Task } from "src/models/task.model";
import { Phase } from "../../models/phase.model";
import { PhaseService } from "../services/phase.service";
import { TaskService } from "../services/task.service";

@Resolver(() => Phase)
export class PhaseResolver {
  constructor(
    private readonly phaseService: PhaseService,
    private readonly taskService: TaskService,
  ) { }

  @Query(() => Phase)
  async getPhase(@Args("phaseId") id: string): Promise<Phase> {
    const phase = await this.phaseService.getPhase(id);
    return phase;
  }

  @ResolveField(() => [Task])
  async tasks(@Parent() phase: Phase): Promise<Task[]> {
    const tasks = await this.taskService.getTasks(phase.id);
    return tasks;
  }
}