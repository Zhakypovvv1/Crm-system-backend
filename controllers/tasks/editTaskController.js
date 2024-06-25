import Task from "../../models/Task.js";

export const editTaskController = async (req, res) => {
  const { taskId } = req.params;
  try {
    const { title } = req.body;
    const editTask = await Task.findByIdAndUpdate(
      taskId,
      { title },
      { new: true }
    );

    if (!editTask) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).send({ message: "Task updated", editTask });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
