import Categories from "../../models/Categories.js";

export const getCategoriesController = async (req, res) => {
  const { userId } = req.user;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const total = await Categories.countDocuments({ userId });
    const pages = Math.ceil(total / pageSize);
    const categories = await Categories.find({ userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).send({
      message: "Categories retrieved successfully",
      categories,
      pages,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
