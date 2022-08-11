import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseBoardElement } from "./base-board-element.model";

@ObjectType()
export class Task extends BaseBoardElement {
  @Field()
  phaseId: string
}