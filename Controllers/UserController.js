const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt")
//desc post register a user
//route /api/users/register
//for now access will be public
const registerUser =asyncHandler(async (req, res)=>{
    // const{username, email, password}=req.body;
    // if(!username || !email || !password){
    //     res.status(400)
    //     throw new Error("All Fileds are mandatory");
    // }
    // const availableUser = await User.findOne({email});
    // if(availableUser){
    //     res.status(400);
    //     throw new Error("User already registred") 
    // }
    // const hashedPassword = await bcrypt.hash(password,10);
    // console.log(`the hashed password is ${hashedPassword}`)
    res.json({message:"Register the user"})
})


//desc post login user
//route /api/user/login
//for now access will be public
const loginUser =asyncHandler(async (req, res)=>{
    res.json({message:"Login user"})
})


//desc to get cuttern user
//route /api/users/current
//private. only logind in user will get current user info
const currentUser =asyncHandler(async (req, res)=>{
    res.json({message:"Current user info"})
})

module.exports={registerUser,loginUser,currentUser}