const express = require('express');
const { handleSignup, handleSignin, handleVerify } = require('../controllers/userController');
const { authChecker } = require('../midleware/AuthChecker');
const userRouter = express.Router()

userRouter.post("/signup", handleSignup)
.post("/signin", handleSignin)
.get("/verify", authChecker, handleVerify)

module.exports = userRouter;