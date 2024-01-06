const express=require("express")
const controllers =require("../controllers/ResourceLinkController")
const requireAuth=require("../middleware/requireAuth")
const router=express.Router()

router.use(requireAuth)

router.route("/")
        .get(controllers.getAllResourceLink)
        .post(controllers.createResourceLink)

module.exports=router