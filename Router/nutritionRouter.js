
const express = require('express')
const nutritionController=require("../Controllers/nutritionController")
const varifyJWT=require('../middleware/verifyJWT')
const varifyAdmin=require('../middleware/verifyAdmin')

const router=express.Router()

router.post("/addNutrion",varifyJWT,varifyAdmin,nutritionController.addNutrition)
router.post("/send-pdf",nutritionController.SendMail)
router.put("/updateById/:id",varifyJWT,varifyAdmin,nutritionController.updateNutrition)
router.get("/readById/:id",nutritionController.getNutritionByID)
router.get("/readByType/:nutrientType",nutritionController.getNutritionByType)
router.delete("/deleteById/:name/:nutrientType" ,varifyJWT,varifyAdmin,nutritionController.deleteNutritionByID)

module.exports=router