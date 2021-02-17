var express = require('express')
var router = express.Router()
const { signout, signup } = require("../controllers/auth"); //imported from controllers in that auth.js and from that we took "signout" 

router.post("/signup", signup);
router.get("/signout", signout);

module.exports = router;