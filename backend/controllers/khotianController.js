const khotianModel=require("../models/khotianModel")
const mongoose=require("mongoose")
//get all workouts
const getAllKhotians = async (req,res) => {
    try {
        const allKhotians=await khotianModel.find().sort({createdAt:-1})

        res.status(200).json(allKhotians)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}
//get a single workout
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
        const newKhotianDocument=await khotianModel.create({taskTitle,taskDetail,date,priority})
        res.status(200).json(newKhotianDocument)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
} 

//delete a workout
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
//update a workout
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
