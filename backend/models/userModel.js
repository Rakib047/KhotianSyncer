const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const validator=require("validator")

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        }
    }
)

//static signup method where we will use hashing for storing password in a safe manner
userSchema.statics.signupStatic=async function(email,password,username){
    //we must use function not arrow one to have this keyword
    //this bcz we dont have the model yet
    
    if(!email||!password||!username){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("You should input a valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }

    const exists=await this.findOne({email})

    if(exists){
        throw Error("Email already in use!")
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser=await this.create({email,password:hashedPassword,username})

    return newUser
}

//static login method
userSchema.statics.loginStatic = async function(email,password){
    if(!email||!password){
        throw Error("All fields must be filled")
    }

    const user=await this.findOne({email})

    if(!user){
        throw Error("Incorrect email!")
    }

    const match=await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("Incorrect Password!")
    }

    return user

}

module.exports=mongoose.model("User",userSchema)