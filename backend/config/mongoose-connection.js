const mongoose = require("mongoose")
const config = require("config")
//set DEBUG =development:* using in the terminal 
const dbgr = require("debug")("development:mongoose")
mongoose
    .connect(`${config.get("MONGODB_URI")}/bagbazaar`)
    .then(function () {
        dbgr('connected')
    })

    .catch(function (err) {
        dbgr(err);

    })

module.exports = mongoose.connection