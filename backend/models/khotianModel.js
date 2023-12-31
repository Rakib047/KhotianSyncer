const mongoose=require("mongoose")

//defining the schema(the structure of the document)
const khotianSchema=new mongoose.Schema(
    {
        taskTitle:{
            type:String,
            required:true
        },
        taskType:{
            type:String,
            required:true
        },
        taskDetail:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        priority:{
            type:String,
            required:true
        },
        user_id: {
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("khotian",khotianSchema)