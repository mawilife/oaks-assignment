
import { Schema } from "mongoose"
import { Task } from "../../../..//models/task.model";
import { CommonSchema } from "./common.schema"

export const TaskSchema = new Schema({
  ...CommonSchema,
  phaseId: { type: Schema.Types.ObjectId },
  isCompleted: { type: Boolean },
  complatedAt: { type: Date },
  order: { type: Number, min: 1 },
}, { collection: "phases", toObject: { virtuals: true } });

TaskSchema.virtual("id").get(function () {
  return this._id.toString();
})

export type BoardDocument = Task | Document;