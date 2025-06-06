const express=require("express")
const rBookController=require("../Controllers/recipeBookController")
const verifyJWT=require('../middleware/verifyJWT')
const router=express.Router()

router.post("/createBook",verifyJWT,rBookController.CreateNewBook)
router.post("/addRecipe",verifyJWT,rBookController.addRecipe)
router.delete("/deleteBook",verifyJWT,rBookController.DeleteAll)
router.delete("/:id",verifyJWT,rBookController.DeleteOne)
router.get("/read",verifyJWT,rBookController.GetBookRecipe)


module.exports=router



/*const express=require("express")
const router=express.Router()
const cookbook=require("../controllers/cookbookController")
const verifyJWT=require("../middleware/verifyJWT")
const managerJWT=require("../middleware/managerJWT")


router.post("/",verifyJWT,cookbook.CreateCookbook)
router.post("/newRecipe",verifyJWT,cookbook.addRecipe)
router.delete("/",verifyJWT,cookbook.DeleteAll)
router.delete("/:id",verifyJWT,cookbook.DeleteOne)
router.get("/",verifyJWT,cookbook.GetCookbook)

module.exports=router*/