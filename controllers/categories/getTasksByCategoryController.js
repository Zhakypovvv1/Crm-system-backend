import Task from "../../models/Task.js";

export const getTasksByCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const total = await Task.countDocuments({ category: categoryId });
    const pages = Math.ceil(total / pageSize);
    const tasks = await Task.find({ category: categoryId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("category");

    res.status(200).send({ tasks, pages, total });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
};
