const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(401).send({ error: "Session expired or token not found. Please login again." });
        }

        const userId = jwtProvider.getUserIdFromToken(token);
        if (!userId) {
            return res.status(401).send({ error: "Token signature decoding failed." });
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            return res.status(401).send({ error: "User unauthorized." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Unauthorized session: " + error.message });
    }
};

module.exports = { authenticate };