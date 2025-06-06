const express=require("express")
const router= express.Router()
const recipe=require("../controllers/recipeController")
const managerJWT=require("../middleware/managerJWT")
const verifyJWT=require("../middleware/verifyJWT")
const multer=require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+'-' +file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })

router.post("/",verifyJWT,managerJWT,upload.single('image'),recipe.addRecipe)
router.post("/:id",verifyJWT,recipe.Addcomment)
router.delete("/:id",verifyJWT,managerJWT,recipe.deleteRecipe)
router.put("/:id",verifyJWT,managerJWT,upload.single('image'),recipe.updateRecipe)
router.get("/",verifyJWT,recipe.getAllRecipe)
router.get("/search",verifyJWT,recipe.getRecipeByName)
router.get("/name",verifyJWT,recipe.sortRecipeByName)
router.get("/date",verifyJWT,recipe.sortRecipeByDate)
router.get("/comment/:id",verifyJWT,recipe.getComments)
router.get("/:id",verifyJWT,recipe.getRecipeByID)




module.exports=router
