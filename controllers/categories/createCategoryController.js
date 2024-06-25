import Categories from "../../models/Categories.js";

export const createCategoryController = async (req, res) => {
  const { userId } = req.user;

  try {
    const { name } = req.body;

    const newCategory = await Categories.create({
      name,
      userId,
    });
    res.status(201).send({ message: "Category is created", newCategory });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
};