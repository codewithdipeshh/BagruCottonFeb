const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");

const authenticate = async (req, res, next) => {
    try {
        // Check token from cookies first
        let token = req.cookies?.jwt;
        
        // If not in cookies, check Authorization header
        if (!token && req.headers?.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

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

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || (req.user.role !== 'ADMIN' && req.user.role !== 'admin')) {
            return res.status(403).send({ error: "Access denied. Admin only." });
        }
        next();
    } catch (error) {
        return res.status(403).send({ error: "Admin authorization failed: " + error.message });
    }
};

module.exports = { authenticate, isAdmin };