import { Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { Min, MinLength, ValidateNested } from "class-validator";
import { Board } from "../../../models/board.model";
import { Phase } from "../../../models/phase.model";
import { Task } from "../../../models/task.model";

@InputType("CreateBoardInput")
export class CreateBoardInput {
  @Field()
  @MinLength(3)
  text: string;

  @Field(() => [PhaseInput])
  @ValidateNested({ each: true })
  @Type(() => PhaseInput)
  phases: PhaseInput[]

  static toModel(board: CreateBoardInput): Board {
    return {
      text: board.text,
      phases: board.phases.map(p => PhaseInput.toModel(p)),
    } as Board
  }
}

@InputType("PhaseInput")
export class PhaseInput {

  @Field()
  @MinLength(3)
  text: string;

  @Field(() => Int)
  @Min(1)
  order: number;

  @Field(() => [TaskInput])
  @ValidateNested({ each: true })
  @Type(() => TaskInput)
  tasks: TaskInput[]

  static toModel(phase: PhaseInput): Phase {
    return {
      order: phase.order,
      text: phase.text,
      tasks: phase.tasks.map(t => TaskInput.toModel(t) as Task),
    } as Phase
  }
}

@InputType("TasksInput")
export class TaskInput {

  @Field()
  @MinLength(3)
  text: string;

  @Field(() => Int)
  @Min(1)
  order: number;

  static toModel(task: TaskInput): Task {
    return {
      order: task.order,
      text: task.text
    } as Task
  }
}