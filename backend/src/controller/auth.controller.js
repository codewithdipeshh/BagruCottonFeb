const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service");

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Pehle check karein ki kya yeh email pehle se registered toh nahi hai
        const existingUser = await userService.getUserByEmail(email).catch(() => null);
        if (existingUser) {
            return res.status(400).send({
                error: "Email is already registered with another account"
            });
        }

        // 2. User create hua (Password hashing userService ke andar hi honi chahiye)
        const user = await userService.createUser(req.body);

        // 3. User bante hi uske liye database me ek fresh empty Cart create karein
        await cartService.createCart(user);

        // 4. JWT Token generate karein
        const jwt = jwtProvider.generateToken(user._id);

        return res.status(201).send({
            jwt,
            message: "Register Success"
        });

    } catch (error) {
        // Redux standard ke liye yahan 'error:' property hi return karein
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
                error: "User not found with this email",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password 
        );
        
        if (!isPasswordValid) {
            return res.status(401).send({
                error: "Invalid Password",
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