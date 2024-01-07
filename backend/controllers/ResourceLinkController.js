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
        const {tag} = req.query
        const user_id=req.userProperty._id
        const allTaggedResources = await ResourceLinkModel.find({tag,user_id})
        const linksOnly = allTaggedResources.map(resource => resource.links);
        //console.log(linksOnly)
        res.status(200).json(linksOnly)
    } catch (err) {
        console.log("Error fetching data from database")
        res.status(500).json({error: err.message})
    }
}

const deleteResourceLink = async (req,res) =>{
    try {
        const {tag,id} = req.params;

        const resource = await ResourceLinkModel.findOne({tag,user_id:req.userProperty._id})

        if(!resource){
            return res.status(404).json({error:"Resource not found"})
        }

        resource.links = resource.links.filter(link=>link._id.toString() !==id)

        await resource.save()

        res.status(200).json({message:"link deleted!"})

    } catch (err) {
        res.status(500).json({message:"Error deleting link"})
    }
}

module.exports ={createResourceLink,getAllResourceLink,deleteResourceLink}