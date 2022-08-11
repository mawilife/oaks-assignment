
import { Schema } from "mongoose"
import { Phase } from "../../../..//models/phase.model";
import { CommonSchema } from "./common.schema";

export const PhaseSchema = new Schema({
  ...CommonSchema,
  boardId: { type: Schema.Types.ObjectId },
  isCompleted: { type: Boolean },
  complatedAt: { type: Date },
  order: { type: Number, min: 1 },
}, { collection: "phases", toObject: { virtuals: true } });

PhaseSchema.virtual("id").get(function () {
  return this._id.toString();
})

export type BoardDocument = Phase | Document;