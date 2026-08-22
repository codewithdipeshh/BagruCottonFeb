const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/user.model");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Email Transporter Config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const register = async (req, res) => {
  try {
    const { firstName, email, password, confirmPassword } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).send({ error: "Required fields (firstName, email, password) are missing" });
    }

    // Strict Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ error: "Please enter a valid and active email address" });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).send({ error: "Password must be at least 6 characters long" });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).send({ error: "Passwords do not match" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await userService.getUserByEmail(normalizedEmail).catch(() => null);

    if (existingUser) {
      return res.status(400).send({ error: "This email is already registered. Please use a different email or login with your existing account." });
    }

    // Create user with isVerified: false by default
    const user = await userService.createUser({
      firstName,
      email: normalizedEmail,
      password,
    });
    
    // Generate Verification Token
    const verifyToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = crypto.createHash("sha256").update(verifyToken).digest("hex");
    await user.save();

    // Send Verification Link via Email
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const verifyUrl = `${frontendUrl}/verify-email?token=${verifyToken}&email=${normalizedEmail}`;

    await transporter.sendMail({
      from: `"Bagru Cotton" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Verify Your Bagru Cotton Account",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Welcome to Bagru Cotton, ${firstName}!</h2>
          <p>Please click the button below to verify your email address and activate your account:</p>
          <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background-color: #080616; color: #fff; text-decoration: none; border-radius: 8px; margin: 15px 0;">Verify Email Address</a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    await cartService.createCart(user);

    return res.status(201).send({ 
      message: "Registration successful! Please check your email inbox to verify your account before logging in." 
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token, email } = req.body;

    if (!token || !email) {
      return res.status(400).send({ error: "Verification token and email are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({ email: normalizedEmail, verificationToken: hashedToken });

    if (!user) {
      return res.status(400).send({ error: "Invalid or expired verification link." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).send({ message: "Email verified successfully! You can now log in." });
  } catch (error) {
    console.error("Verify Email Error:", error);
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await userService.getUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).send({ error: "Invalid email or password" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).send({ error: "Please verify your email address before logging in. Check your inbox for the verification link." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const jwt = jwtProvider.generateToken(user._id);

    return res.status(200).send({ jwt, message: "Login Success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const adminLoginStep1 = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).send({ error: "Invalid admin credentials" });
    }

    if (!user.role || user.role.toUpperCase() !== "ADMIN") {
      return res.status(403).send({ error: "Access Denied: You do not have Admin privileges" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid admin credentials" });
    }

    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = generatedOTP;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: `"Bagru Cotton Admin Security" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Admin Panel Login Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Admin Login Verification</h2>
          <p>Hello ${user.firstName || "Admin"},</p>
          <p>Your OTP for logging into the Bagru Cotton Admin Panel is:</p>
          <h1 style="background: #f4f4f4; padding: 10px; display: inline-block; letter-spacing: 4px; color: #080616;">${generatedOTP}</h1>
          <p>This OTP is valid for 10 minutes. Do not share this OTP with anyone.</p>
        </div>
      `,
    });

    return res.status(200).send({
      message: "OTP sent successfully to registered admin email!",
      email: user.email,
      step: 2,
    });
  } catch (error) {
    console.error("Admin Step 1 Error:", error);
    return res.status(500).send({ error: error.message });
  }
};

const verifyAdminOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).send({ error: "Email and OTP are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).send({ error: "User profile not found" });
    }

    if (!user.otp) {
      return res.status(400).send({ error: "No OTP request found. Please login again." });
    }

    if (String(user.otp).trim() !== String(otp).trim()) {
      return res.status(400).send({ error: "Invalid OTP entered" });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).send({ error: "OTP has expired. Please try logging in again." });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const jwt = jwtProvider.generateToken(user._id);

    return res.status(200).send({
      jwt,
      message: "Admin Authentication Successful!",
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).send({ error: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).send({ error: "Google token payload is required" });
    }

    let email, given_name;

    if (token.startsWith("ya29.")) {
      const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      email = googleResponse.data.email;
      given_name = googleResponse.data.given_name;
    } else {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      given_name = payload.given_name;
    }

    if (!email) {
      return res.status(400).send({ error: "Failed to extract email from Google Token" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = await userService.getUserByEmail(normalizedEmail).catch(() => null);

    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString("hex");
      user = await userService.createUser({
        firstName: given_name || "Google User",
        email: normalizedEmail,
        password: randomPassword,
        isVerified: true, // Google accounts are auto-verified
      });
      await cartService.createCart(user);
    } else if (!user.isVerified) {
      // Auto-verify if they registered manually previously and now use Google
      user.isVerified = true;
      await user.save();
    }

    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "Google Auth Success" });
  } catch (error) {
    return res.status(500).send({
      error: error.response?.data?.error_description || error.message || "Google Auth failed",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(200).send({
        message: "If that email address is in our database, we will send you a password reset link.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 Hour
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    // Check if user is admin and use admin reset password route
    const isAdmin = user.role && user.role.toUpperCase() === "ADMIN";
    const resetRoute = isAdmin ? "/admin/reset-password" : "/reset-password";
    const resetUrl = `${frontendUrl}${resetRoute}?token=${resetToken}`;

    await transporter.sendMail({
      from: `"Bagru Cotton Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Password Reset Request</h2>
          <p>Hello ${user.firstName || "Customer"},</p>
          <p>Click the link below to set a new password for your account:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #080616; color: #fff; text-decoration: none; border-radius: 8px; margin: 15px 0;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).send({ message: "Password reset link sent to your email successfully!" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).send({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).send({ error: "Token and new password are required" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({ error: "Invalid or expired password reset token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).send({
      message: "Password reset successful! You can now log in with your new password.",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const fixUndefinedNames = async (req, res) => {
  try {
    const usersWithUndefined = await User.find({
      $or: [
        { firstName: "undefined" },
        { firstName: null },
        { firstName: "" },
        { firstName: { $exists: false } }
      ]
    });

    let fixedCount = 0;
    for (const user of usersWithUndefined) {
      const newFirstName = user.email ? user.email.split('@')[0] : 'User';
      user.firstName = newFirstName;
      await user.save();
      fixedCount++;
    }

    return res.status(200).send({ 
      message: `Fixed ${fixedCount} users with undefined names`,
      fixedCount 
    });
  } catch (error) {
    console.error("Error fixing undefined names:", error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  adminLoginStep1,
  verifyAdminOTP,
  fixUndefinedNames,
};