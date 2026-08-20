const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Security registry identity key not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials configuration parameters." });
    }

   
    if (user.role !== "ADMIN" && user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Administrative signatures mismatch." });
    }

    const token = jwtProvider.generateToken(user._id);

    return res.status(200).json({
      jwt: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { adminLogin };