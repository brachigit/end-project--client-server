const nutrition=require("../controllers/nutritionController")
const express=require("express")
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const managerJWT=require("../middleware/managerJWT")
router.post("/addNutrion",verifyJWT,managerJWT,nutrition.addNutrition)
router.post("/send-pdf",verifyJWT,nutrition.SendMail)
router.put("/updateById/:id",verifyJWT,managerJWT,nutrition.updateNutrition)
router.get("/readByType/:nutrientType",verifyJWT,nutrition.getNutritionByType)
router.get("/readById/:id",verifyJWT,nutrition.getNutritionByID)
router.delete("/deleteByName/:name/:nutrientType",verifyJWT,managerJWT,nutrition.deleteNutritionByName)

module.exports=router


