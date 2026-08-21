const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const setAuthCookie = (res, jwt) => {
    res.cookie('jwt', jwt, {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax',
        maxAge: 48 * 60 * 60 * 1000 // 48 Hours
    });
};

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

        setAuthCookie(res, jwt);

        return res.status(200).send({
            message: "Auth Success",
            jwt: jwt, 
            user: { 
                id: user._id, 
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
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

        setAuthCookie(res, jwt);

        return res.status(200).send({
            message: "Login Success",
            jwt: jwt,
            user: { 
                id: user._id, 
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
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

        console.log("Validating Google Token with Google APIs...");
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user info from Google via Access Token");
        }

        const payload = await response.json();
        const { email, given_name, family_name } = payload;

        if (!email) {
            return res.status(400).send({ error: "Could not extract email from Google identity" });
        }

        let user = await userService.getUserByEmail(email).catch(() => null);

        if (!user) {
            console.log("👤 Creating a new Google User inside database...");
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

     
        setAuthCookie(res, jwt);

        console.log("Google Auth Session Success. Dropping cookie.");
        
        
        return res.status(200).send({
            message: "Google Auth Success",
            jwt: jwt,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Google Auth Error Handler Exception:", error.message);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    googleLogin,
};