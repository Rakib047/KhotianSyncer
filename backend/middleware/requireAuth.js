const jwt=require("jsonwebtoken")
const userModel=require("../models/userModel")

const requireAuth =async (req,res,next) =>{
    
    
    //verify authentication
    const {authorization}=req.headers

    //what we do here is that suppose from Home in frontend,we ask for a GET req,if the
    //req does not contain authorization header..then we wont let Home to show the khotianList
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"})
    }

    const token = authorization.split(" ")[1]

    //we are verifying the token to make sure it was not tempered
    try {
        const {_id} = jwt.verify(token,process.env.SECRET_KEY) //extracting the id from payload by verifying the token
        
        //attaching userProperty to req so that we can later use it
        req.userProperty=await userModel.findOne({_id}).select("_id") 
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error:"Request is not authorized"})
    }
}

module.exports=requireAuth