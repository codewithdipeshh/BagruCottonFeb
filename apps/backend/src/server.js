const dotenv = require("dotenv");
dotenv.config();

const app = require(".");
const { connectDb } = require("./config/db");

const PORT = process.env.PORT || 5454;

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log("Ecommerce API listening on Port:", PORT);
  } catch (error) {
    console.log("DB Connection Error:", error.message);
  }
});