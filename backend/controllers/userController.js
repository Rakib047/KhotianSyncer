const userModel=require("../models/userModel")
//login user
const loginUser = async (req,res) =>{
    res.json({msg:"login user success!"})
}

//signupUser
const signupUser = async (req,res) =>{
    res.json({msg:"signup user success!"})
}

module.exports={
    loginUser,signupUser
}