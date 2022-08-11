import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "./base.model";
import { Phase } from "./phase.model";

@ObjectType()
export class Board extends BaseModel {
  @Field(() => [Phase])
  phases: Phase[]

}