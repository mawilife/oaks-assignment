import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseBoardElement } from "./base-board-element.model";
import { Task } from "./task.model";

@ObjectType()
export class Phase extends BaseBoardElement {
  @Field(() => [Task])
  tasks: Task[]

  @Field()
  boardId: string
}