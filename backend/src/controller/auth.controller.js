const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service");
const { OAuth2Client } = require("google-auth-library");

// Google Security Core Client Initialization
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const existingUser = await userService.getUserByEmail(email).catch(() => null);
        if (existingUser) {
            return res.status(400).send({
                error: "Email is already registered with another account"
            });
        }

        const user = await userService.createUser(req.body);

        
        await cartService.createCart(user);

      
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


const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).send({ error: "Google token payload is required" });
        }

        // 1. Google OAuth Server Verification Sequence
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, given_name, family_name } = payload;

        
        let user = await userService.getUserByEmail(email).catch(() => null);

        if (!user) {
            console.log(`✨ Creating organic Google Identity record for: ${email}`);
            
           
            const newUserData = {
                firstName: given_name || "Google",
                lastName: family_name || "User",
                email: email.trim().toLowerCase(),
                
                password: `OAUTH_SYSTEM_BYPASS_${Math.random().toString(36).slice(-10)}` 
            };

            
            user = await userService.createUser(newUserData);

            
            await cartService.createCart(user);
        }

        
        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({
            jwt,
            message: "Google Auth Success"
        });

    } catch (error) {
        
        return res.status(500).send({
            error: error.message || "Google Authentication processing collapsed"
        });
    }
};

module.exports = {
    register,
    login,
    googleLogin, 
};