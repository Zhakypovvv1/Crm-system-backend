import Task from "../../models/Task.js";

export const getTasksController = async (req, res) => {
  const { userId } = req.user;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 8;

  try {
    const total = await Task.countDocuments(userId);
    const pages = Math.ceil(total / pageSize);
    const tasks = await Task.find({ userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res
      .status(200)
      .send({ message: "Tasks retrieved successfully", tasks, pages });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
