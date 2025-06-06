
const express = require('express')
const autherController=require("../Controllers/authController")
const router=express.Router()


router.post("/login", autherController.Login )
router.post("/sight_in/user", autherController.Register)


module.exports=router
