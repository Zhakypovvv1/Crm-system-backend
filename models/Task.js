import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    details: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Details",
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      default: null,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);
export default model("Task", TaskSchema);
