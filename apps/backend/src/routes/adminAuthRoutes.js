
const express = require("express");
const router = express.Router();
const { adminLogin, forgotPassword, resetPassword, setupAdmin } = require("../controller/adminAuthController");


router.post("/login", adminLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/setup-admin", setupAdmin);

module.exports = router;