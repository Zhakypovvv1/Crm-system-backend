import Task from "../../models/Task.js";

export const toggleTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).send({ message: "Todo not found" });
    }

    if (task.userId !== req.user.userId) {
      return res.status(403).send({ message: "Forbidden" });
    }

    task.status = !task.status;
    await task.save();

    res.status(200).send({ message: "Task status updated", task });
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
};
