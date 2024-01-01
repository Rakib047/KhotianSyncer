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
        const roll=loggedInUser.roll
        const currentSemester=loggedInUser.currentSemester
        const department=loggedInUser.department
        res.status(200).json({email,jwtToken,username,roll,currentSemester,department})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

//signupUser
const signupUser = async (req,res) =>{

    const {email,password,username,roll,currentSemester,department} =req.body
    
    try {
        //create in database will happen in signupStatic
        const newUser=await userModel.signupStatic(email,password,username,roll,currentSemester,department)

        const jwtToken=createToken(newUser._id)
        
        res.status(200).json({email,jwtToken,username,roll,currentSemester,department})
    } catch (err) {
        res.status(400).json({error:err.message},"here")
    }

}

//user update
const updateUser = async (req, res) => {
    const { prevEmail,username,roll,currentSemester,department,email } = req.body;
    const user = await userModel.profileInfoStatic(prevEmail); // Assuming you have middleware to extract user information from the token
    console.log("hmm")
    console.log(user._id)
    
    console.log(user.username)
    try {
      // Update user profile in the database
      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        {
          username,
          roll,
          currentSemester,
          department,
          email
        },
        { new: true }
      );
      
      // Respond with the updated user profile
      res.status(200).json(updatedUser);
    } catch (err) {
        
      res.status(400).json({ error: err.message });
    }
  };

module.exports={
    loginUser,signupUser,updateUser
}