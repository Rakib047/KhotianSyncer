const express=require("express")
const controllers =require("../controllers/khotianController")
const requireAuth=require("../middleware/requireAuth")
const router=express.Router()

router.use(requireAuth)
//before using these the user has to be authenticated,thats why we put the above middleware function

router.route("/")
        .get(controllers.getAllKhotians)
        .post(controllers.createKhotian)

router.route("/:id")
        .get(controllers.getSingleKhotian)
        .delete(controllers.deleteKhotian)
        .patch(controllers.updateKhotian)



module.exports=router