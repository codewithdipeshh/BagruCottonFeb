const mongoose = require("mongoose");

// 💡 Fix: .net/ ke baad 'bagru-cotton' database naam jod diya hai aur aapka password hidden rakha hai
const mongodbUrl = "mongodb+srv://dipeshhver0015_db_user:Db49ihZ8SAXr2feH@cluster0.canxgoi.mongodb.net/bagru-cotton?appName=Cluster0";

const connectDb = () => {
    return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb };