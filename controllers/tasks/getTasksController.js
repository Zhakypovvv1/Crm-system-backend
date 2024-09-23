import Task from "../../models/Task.js";

export const getTasksController = async (req, res) => {
  const { userId } = req.user;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 8;
  const searchQuery = req.query.search || "";
  const sortBy = req.query.sortBy || "createdAt";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

  try {
    const searchFilter = searchQuery
      ? {
          $and: [
            { userId },
            {
              $or: [
                { title: new RegExp(searchQuery, "i") },
                {
                  notes: { $elemMatch: { text: new RegExp(searchQuery, "i") } },
                },
              ],
            },
          ],
        }
      : { userId };

    const total = await Task.countDocuments(searchFilter);
    const pages = Math.ceil(total / pageSize);
    const tasks = await Task.find(searchFilter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res
      .status(200)
      .send({ message: "Tasks retrieved successfully", tasks, pages, total });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
