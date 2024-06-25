import { Schema, model } from "mongoose";

const DetailsSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Details", DetailsSchema);
