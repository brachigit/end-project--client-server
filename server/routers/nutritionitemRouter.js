const nutrition=require("../controllers/nutritionController")
const express=require("express")
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const managerJWT=require("../middleware/managerJWT")
router.post("/",verifyJWT,managerJWT,nutrition.addNutrition)
router.put("/:id",verifyJWT,managerJWT,nutrition.updateNutrition)
router.get("/",verifyJWT,nutrition.getNutritionByType)
router.get("/:id",verifyJWT,nutrition.getNutritionByID)
router.delete("/:id",verifyJWT,managerJWT,nutrition.deleteNutritionByID)

module.exports=router


