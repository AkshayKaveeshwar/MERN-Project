var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
const { signout, signup } = require("../controllers/auth"); //imported from controllers in that auth.js and from that we took "signout" 

//here "/signup" is route, [] in this express-validator operation, and "signup" is controller.
router.post("/signup", [
    check("name", "name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 characters").isLength({ min: 3 }) 
 ], 
 signup
);  
router.get("/signout", signout);

module.exports = router;