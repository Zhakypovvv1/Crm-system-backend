import Task from "../../models/Task.js";

export const addTagsToTaskController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { tagIds } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send("Task not found");
    }

    task.tags = tagIds;

    await task.save();

    res.status(200).send({ messsage: "Tags added to task", task });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
};
