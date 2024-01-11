const express=require("express")
const controllers =require("../controllers/routineController")
const requireAuth=require("../middleware/requireAuth")
const router=express.Router()

router.use(requireAuth)

router.route("/")
      .post(controllers.saveCell)

router.route("/:id")
      .put(controllers.updateCell)

router.route("/:rowIndex/:colIndex")
      .get(controllers.getCell)

module.exports=router