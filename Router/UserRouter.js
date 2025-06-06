
const express = require('express')
const userControllers=require("../Controllers/userController")
const varifyJWT=require('../middleware/verifyJWT')
const varifyAdmin=require('../middleware/verifyAdmin')

const router=express.Router()


router.post("/manager",varifyJWT,varifyAdmin,userControllers.AddAdmin)
router.get("/",varifyJWT,userControllers.ReadAllUsers)
router.get("/:id",varifyJWT,userControllers.ReadUserById)
router.get("/skip",varifyJWT,userControllers.ReadUserBySkip)
router.put("/:id",verifyJWT,userControllers.UpdateUsers)
router.delete("/:id",varifyJWT,userControllers.DeleteUsers)



module.exports=router

