import { Schema } from "mongoose"

export const CommonSchema = new Schema({
  text: { type: String, minLength: 3 },
  createAt: { type: Date },
  deletedAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
});