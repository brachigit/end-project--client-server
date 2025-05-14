const users=require("../controllers/userControllers")
const express=require('express')
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const managerJWT=require("../middleware/managerJWT")

router.get("/",managerJWT,users.getAllUser)
router.get("/:id",verifyJWT,users.getUserById)
router.post("/",users.creatNewUser)
router.post("/",managerJWT,users.creatNewManager)
router.delete("/:id",verifyJWT,users.deleteUser)
router.put("/:id",verifyJWT,users.updateUser)

module.exports=router