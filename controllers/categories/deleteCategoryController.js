import Categories from "../../models/Categories.js";

export const deleteCategoryController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Categories.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({ message: "Category deleted successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
