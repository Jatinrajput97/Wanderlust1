const express= require("express");
const router=  express.Router();
const User= require("../models/user.js");   
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const userController=require("../controllers/user.js");
const { saveRedirect } = require("../middleware.js");

router.route("/signup")
.get(userController.signUpFormRender)
.post( wrapAsync(userController.signup));

router.route("/login")
.get(userController.login)
.post(saveRedirect, passport.authenticate("local", 
    {
    failureRedirect:"/login",
    failureFlash: true,
     }), userController.loginPost
   );

router.get("/logout", userController.logout);

 module.exports=router;