import { Field, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export abstract class BaseModel {

  @Field()
  id: string;

  @Field()
  text: string

  @Field()
  createAt: Date

  deletedAt?: Date

  isDeleted: boolean
}