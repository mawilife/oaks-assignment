import { Field, Int, InterfaceType } from "@nestjs/graphql";
import { BaseModel } from "./base.model";

@InterfaceType()
export abstract class BaseBoardElement extends BaseModel {
  @Field()
  isCompleted: boolean;


  @Field({ nullable: true })
  complatedAt?: Date;

  @Field(() => Int)
  order: number;


}