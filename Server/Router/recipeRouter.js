
const multer  = require('multer')
const path = require('path');
const express=require('express')
const verifyJWT=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")
const recipeController=require("../Controllers/recipeController")


const router=express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname+ '-' + uniqueSuffix )
    }
  })
  
  const upload = multer({ storage: storage })
  
router.post("/addrecipe", verifyJWT,verifyAdmin,upload.single('image'),recipeController.AddRecipe)
router.put("/updateRecipe", verifyJWT,verifyAdmin, upload.single('image'),recipeController.UpdateRecipe)
router.put("/updatePartRecipe", verifyJWT,verifyAdmin,recipeController.UpdateRecipe)
router.delete("/deleteRecipe", verifyJWT,verifyAdmin, upload.single('image'),recipeController.DeleteRecipe)
router.get("/readAll", upload.single('image'),recipeController.ReadAll)
router.get("/readOne", upload.single('image'),recipeController.ReadOne)


module.exports=router