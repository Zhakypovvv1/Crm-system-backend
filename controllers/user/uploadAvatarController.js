import Auth from "../../models/Auth.js";
import path from "path";

export const uploadAvatarController = async (req, res) => {
  const { userId } = req.user;
  console.log(req.file);
  try {
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const avatarUrl = path.join("uploads", req.file.filename);
    user.avatarUrl = avatarUrl;
    await user.save();

    res.status(200).send({ message: "Avatar uploaded" });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
