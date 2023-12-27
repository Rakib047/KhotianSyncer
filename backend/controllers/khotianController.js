const khotianModel=require("../models/khotianModel")
const mongoose=require("mongoose")
//get all khotian
const getAllKhotians = async (req,res) => {
    try {
        const user_id=req.userProperty._id
        const allKhotians = await khotianModel.find({user_id});

        // Define the custom order of priorities
        const priorityOrder = ["High", "Medium", "Low"];
    
        // Sort the documents in the desired order
        const sortedKhotians = allKhotians.sort((a, b) => {
          const priorityA = priorityOrder.indexOf(a.priority);
          const priorityB = priorityOrder.indexOf(b.priority);
          return priorityA - priorityB;
        });
    
        res.status(200).json(sortedKhotians);
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}
//get a single khotian
const getSingleKhotian = async (req,res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({errMsg:"Not a valid id"})
        }
        const targetKhotian=await khotianModel.findById(req.params.id)
        res.status(200).json(targetKhotian)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}
//post a workout
const createKhotian = async (req,res) =>{
    
    try {
        const {taskTitle,taskDetail,date,priority} = req.body
        const user_id=req.userProperty._id
        
        await khotianModel.create({taskTitle,taskDetail,date,priority,user_id})
        console.log(user_id)
        //res.status(200).json(newKhotianDocument)
        //sending sorted khotians
        const allKhotians = await khotianModel.find({user_id});
        
        // Define the custom order of priorities
        const priorityOrder = ["High", "Medium", "Low"];
    
        // Sort the documents in the desired order
        const sortedKhotians = allKhotians.sort((a, b) => {
          const priorityA = priorityOrder.indexOf(a.priority);
          const priorityB = priorityOrder.indexOf(b.priority);
          return priorityA - priorityB;
        });
    
        res.status(200).json(sortedKhotians);
    } catch (err) {
        res.status(400).json({error:err.message})
    }
} 

//delete a khotian
const deleteKhotian = async (req,res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({errMsg:"Not a valid id"})
        }
        const targetKhotian=await khotianModel.findById(req.params.id)
        await khotianModel.deleteOne(targetKhotian)
        res.status(200).json(targetKhotian)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}
//update a khotian
const updateKhotian = async (req,res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({errMsg:"Not a valid id"})
        }
        const targetKhotian=await khotianModel.findOneAndUpdate({_id:req.params.id},
            {...req.body})
        res.status(200).json(targetKhotian)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

module.exports={
    createKhotian,
    getAllKhotians,
    getSingleKhotian,
    updateKhotian,
    deleteKhotian
}
