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
router.delete("/:id",managerJWT,recipe.deleteRecipe)
router.put("/:id",managerJWT,upload.single('image'),recipe.updateRecipe)
router.get("/",verifyJWT,recipe.getAllRecipe)
router.get("/:id",verifyJWT,recipe.getRecipeByID)


module.exports=router
