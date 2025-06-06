const express=require("express")
const rBookController=require("../Controllers/recipeBookController")
const verifyJWT=require('../middleware/verifyJWT')
const router=express.Router()

router.post("/createBook",verifyJWT,rBookController.CreateNewBook)
router.post("/addRecipe",verifyJWT,rBookController.addRecipe)
router.delete("/deleteBook",verifyJWT,rBookController.DeleteAll)
router.delete("/deleteRecipe",verifyJWT,rBookController.DeleteOne)
router.get("/read",verifyJWT,rBookController.GetBookRecipe)


module.exports=router