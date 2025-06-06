const users=require("../controllers/userControllers")
const express=require('express')
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const managerJWT=require("../middleware/managerJWT")

router.get("/",verifyJWT,managerJWT,users.getAllUser)
router.get("/skip",verifyJWT,managerJWT,users.getUserBySkip)
router.get("/:id",verifyJWT,users.getUserById)
router.post("/",users.creatNewUser)
router.post("/manager",verifyJWT,managerJWT,users.creatNewManager)
router.delete("/:id",verifyJWT,users.deleteUser)
router.put("/:id",verifyJWT,users.updateUser)

module.exports=router