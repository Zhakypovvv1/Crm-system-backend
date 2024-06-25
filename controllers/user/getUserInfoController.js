import Auth from "../../models/Auth.js";

export const getUserInfoController = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await Auth.findById(userId).select("-hash_pass");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
};
