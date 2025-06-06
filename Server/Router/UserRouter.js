
const express = require('express')
const userControllers=require("../Controllers/userController")
const varifyJWT=require('../middleware/verifyJWT')
const varifyAdmin=require('../middleware/verifyAdmin')

const router=express.Router()

// router.use(varifyJWT)פשר או בצורה הזו או בצורה ידנית
// router.use(varifyAdmin)//א כמו בקוד שבכל ראוטר וראוטר..

router.post("/create",varifyJWT,varifyAdmin,userControllers.AddAdmin)
// router.get("/read",varifyJWT,userControllers.ReadAllUsers)
// router.get("/delete",varifyJWT,userControllers.DeleteUsers)




module.exports=router

