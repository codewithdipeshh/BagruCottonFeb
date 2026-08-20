const jwt = require("jsonwebtoken");


const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (userId) => {
  if (!SECRET_KEY) {
    throw new Error("Critical Error: JWT_SECRET is not defined in environment variables!");
  }
  return jwt.sign(
    { userId },
    SECRET_KEY,
    { expiresIn: "48h" }
  );
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
  } catch (error) {
    console.error("JWT Verification Failed inside Provider:", error.message);
    return null;
  }
};

module.exports = {
  generateToken,
  getUserIdFromToken,
};