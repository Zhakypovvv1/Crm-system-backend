import Auth from "../../models/Auth.js";

export const updatePasswordController = async (req, res) => {
  const { userId } = req.user;
  const { currentPassword, newPassword } = req.body;
  console.log(currentPassword, newPassword);
  try {
    const user = await Auth.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).send("Current password is incorrect");
    }

    await user.updatePassword(newPassword);

    res.status(200).send({ message: "Password updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
