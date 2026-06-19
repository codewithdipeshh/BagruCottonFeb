const express = require("express")
const router = express.Router();

router.get("/", function(req, res){
    res.send("index")
})

router.post("/register", async function(req, res){
    let {email}
})

module.exports = router;