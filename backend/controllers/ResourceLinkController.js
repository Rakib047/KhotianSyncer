const ResourceLinkModel = require("../models/ResourceLinkModel")
const mongoose=require("mongoose")

const createResourceLink = async (req,res)=>{
    try {
        const {tag,title,semester,link} = req.body;
        const user_id = req.userProperty._id

        //finding the resource document with the specified tag(like seniorresource)
        let resource = await ResourceLinkModel.findOne({tag,user_id})

        if(!resource){
            resource = await ResourceLinkModel.create({tag,links:[],user_id})
        }

        resource.links.push({title,semester,link})

        await resource.save()

        res.status(200).json({title,semester,link})

    } catch (err) {
        console.log("error creating resource or pushing link")
        res.status(400).json({error:err.message})
    }
}

const getAllResourceLink = async (req,res)=>{
    try {
        const user_id=req.userProperty._id
        const allResources = await ResourceLinkModel.find({user_id})

        res.status(200).json(allResources)
    } catch (err) {
        console.log("Error fetching data from database")
        res.status(500).json({error: err.message})
    }
}

module.exports ={createResourceLink,getAllResourceLink}