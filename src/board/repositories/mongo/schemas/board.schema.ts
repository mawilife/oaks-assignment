
import { Schema } from "mongoose"
import { Board } from "../../../..//models/board.model";
import { CommonSchema } from "./common.schema";

export const BoardSchema = new Schema({
  ...CommonSchema
}, { collection: "boards", toObject: { virtuals: true } });

BoardSchema.virtual("id").get(function () {
  return this._id.toString();
})

export type BoardDocument = Board | Document;