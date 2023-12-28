const userModel=require("../models/userModel")
const jwt=require("jsonwebtoken")

//generating jwt(token)
const createToken = (id) =>{
    return jwt.sign({_id:id},process.env.SECRET_KEY,{expiresIn: "3d"})
}

//login user
const loginUser = async (req,res) =>{
    const {email,password} =req.body
    try {
        //return from database,findOne()
        const loggedInUser=await userModel.loginStatic(email,password)

        const jwtToken=createToken(loggedInUser._id)
        
        const username=loggedInUser.username
        res.status(200).json({email,jwtToken,username})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

//signupUser
const signupUser = async (req,res) =>{

    const {email,password,username} =req.body
    
    try {
        //create in database will happen in signupStatic
        const newUser=await userModel.signupStatic(email,password,username)

        const jwtToken=createToken(newUser._id)
        
        res.status(200).json({email,jwtToken,username})
    } catch (err) {
        res.status(400).json({error:err.message},"here")
    }

}

module.exports={
    loginUser,signupUser
}