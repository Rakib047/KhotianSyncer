const express=require("express")
const controllers =require("../controllers/khotianController")
const router=express.Router()



router.route("/")
        .get(controllers.getAllKhotians)
        .post(controllers.createKhotian)

router.route("/:id")
        .get(controllers.getSingleKhotian)
        .delete(controllers.deleteKhotian)
        .patch(controllers.updateKhotian)



module.exports=router