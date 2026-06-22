const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service");

const register = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;

        // Check password and confirm password
        if (password !== confirmPassword) {
            return res.status(400).send({
                message: "Passwords do not match"
            });
        }

        // 1. User create hua
        const user = await userService.createUser(req.body);

        // 🚀 FINAL FIX: User bante hi uske liye database me ek fresh empty Cart create kar do!
        await cartService.createCart(user);

        // 2. JWT Token generate hua
        const jwt = jwtProvider.generateToken(user._id);

        return res.status(201).send({
            jwt,
            message: "Register Success"
        });

    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).send({
                message: "User not found with this email",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password 
        );
        
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid Password",
            });
        }

        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({
            jwt,
            message: "Login Success",
        });

    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
};