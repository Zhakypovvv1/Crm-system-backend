import Task from "../../models/Task.js";
import Note from "../../models/Note.js";

export const getNotesController = async (req, res) => {
  const { taskId } = req.params;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    const total = await Note.countDocuments({ taskId });
    const pages = Math.ceil(total / pageSize);
    const notes = await Note.find({ taskId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res
      .status(200)
      .send({ message: "Notes retrieved successfully", notes, pages });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
