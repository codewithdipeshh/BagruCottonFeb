const mongoose = require("mongoose");

const connectDb = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Vault Connected Successfully!");
  } catch (error) {
    console.log("DB Connection Error:", error.message);
    
    process.exit(1);
  }
};

module.exports = { connectDb };