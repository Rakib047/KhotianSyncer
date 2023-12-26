const userModel=require("../models/userModel")
//login user
const loginUser = async (req,res) =>{
    res.json({msg:"login user success!"})
}

//signupUser
const signupUser = async (req,res) =>{

    const {email,password} =req.body
    try {
        const newUser=await userModel.signupStatic(email,password)

        res.status(200).json({email,newUser})
    } catch (err) {
        res.status(400).json({error:err.message})
    }

}

module.exports={
    loginUser,signupUser
}