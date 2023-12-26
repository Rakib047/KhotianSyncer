const userModel=require("../models/userModel")
const jwt=require("jsonwebtoken")

//generating jwt(token)
const createToken = (id) =>{
    return jwt.sign({_id:id},process.env.SECRET_KEY,{expiresIn: "3d"})
}

//login user
const loginUser = async (req,res) =>{
    res.json({msg:"login user success!"})
}

//signupUser
const signupUser = async (req,res) =>{

    const {email,password} =req.body
    try {
        //create in database will happen in signupStatic
        const newUser=await userModel.signupStatic(email,password)

        const jwtToken=createToken(newUser._id)

        res.status(200).json({email,jwtToken})
    } catch (err) {
        res.status(400).json({error:err.message})
    }

}

module.exports={
    loginUser,signupUser
}