const userService = require("../services/user.service");

const getUserProfile = async (req, res) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        error: "Token not found",
      });
    }

    const user =
      await userService.getUserProfileByToken(
        token
      );

    return res.status(200).send(user);

  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users =
      await userService.getAllUsers();

    return res.status(200).send(users);

  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
  getAllUser,
};