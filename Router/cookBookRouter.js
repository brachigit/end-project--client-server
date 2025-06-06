const express=require("express")
const router=express.Router()
const cookbook=require("../Controllers/cookBookController")
const verifyJWT=require("../middleware/verifyJWT")
const managerJWT=require("../middleware/managerJWT")


router.post("/",verifyJWT,cookbook.CreateCookbook)
router.post("/newRecipe",verifyJWT,cookbook.addRecipe)
router.delete("/",verifyJWT,cookbook.DeleteAll)
router.delete("/:id",verifyJWT,cookbook.DeleteOne)
router.get("/",verifyJWT,cookbook.GetCookbook)

module.exports=router
