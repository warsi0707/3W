const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config/Config");


const handleSignup = async (req,res) => {
  const { username, password, email } = req.body;
  try {
    if (!username || !password || !email) {
      return res.status(404).json({
        error: "All input required",
      });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(404).json({
        error: `${username} already registerd`,
      });
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      username,
      password: hashPassword,
      email
    });
    return res.json({
      message: `${username} signup success`,
      user: newUser,
    });
  } catch (error) {
    res.status(404).json({
      error: error.mesage,
    });
  }
};
const handleSignin =async(req,res)=>{
    const { email, password } = req.body;
    if(!email || !password){
            return res.status(404).json({
                error: "Email and password required"
            })
        }
    try {
        
        const findUser = await User.findOne({ email })
        if (!findUser) {
            return res.status(404).json({
                error: `${email} not found`
            })
        }
        const matchedPassword = findUser ? bcrypt.compare(password, findUser.password) : false
        if(!matchedPassword){
            return res.status(404).json({
                error: "Username or Password not matched"
            })
        }
            const token = jwt.sign({
                userId: findUser._id,
                username: findUser.username,
                email: findUser.email
            }, JWT_USER_SECRET)
            return res.json({
                message: "Signin Succes",
                token: token,
                user:{
                    username: findUser.username,
                    email: findUser.email,
                    role: findUser.role,
                    userId: findUser._id
                }
            })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}
const handleVerify =async(req,res)=>{
    try{
        return res.json(req.user)
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}


module.exports = {
    handleSignin,
    handleSignup,
    handleVerify
}