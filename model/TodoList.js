import { model, models, Schema } from "mongoose";

const TodoSchema = new Schema(
  {
    userId: {
      type: String,
    },
    TaskName: {
      type: String,
    },
    TaskDescription: {
      type: String,
    },
    TaskDeadLine: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TodoList = models.TodoList || model("TodoList", TodoSchema);

export default TodoList;
