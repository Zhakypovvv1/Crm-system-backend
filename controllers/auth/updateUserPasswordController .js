export const updateUserPasswordController = async (req, res) => {
  const { userId } = req.user;
  const { newPassword } = req.body;

  try {
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.updatePassword(newPassword);

    res.status(200).send({ message: "User password updated" });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
