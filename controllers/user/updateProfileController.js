import Auth from "../../models/Auth.js";

export const updateProfileController = async (req, res) => {
  const { userId } = req.user;

  try {
    const { name, email } = req.body;

    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).send({ message: "Profile updated", user });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
