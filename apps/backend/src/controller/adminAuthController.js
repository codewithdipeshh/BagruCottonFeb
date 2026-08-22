const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");
const crypto = require("crypto");

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
      admin_jwt: token,
      user: {
        id: user._id,
        name: user.name || user.firstName,
        firstName: user.firstName,
        email: user.email,
        role: user.role === 'admin' ? 'ADMIN' : user.role
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email." });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Save reset token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // In production, send email with reset link
    // For now, return the token for testing
    return res.status(200).json({ 
      message: "Password reset link sent to your email",
      resetToken: resetToken,
      email: email
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const setupAdmin = async (req, res) => {
  try {
    const { email, password, firstName } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = new User({
      firstName: firstName || "Admin",
      email: email,
      password: hashedPassword,
      role: "ADMIN"
    });

    await admin.save();

    return res.status(201).json({ 
      message: "Admin user created successfully",
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { adminLogin, forgotPassword, resetPassword, setupAdmin };