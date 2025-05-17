const fs = require('fs')
const path = require('path');
const Recipe=require("../Models/recipe")


const AddRecipe=async(req,res)=>{
    const {name,description}=req.body

    if (!name||!description){
        return res.status(400).json({message:'Please fill in all required fields'})
    }
    const imagePath = req.file ? `uploads/${req.file.filename}` : null

    const obj =await Recipe.findOne({$or: [
        { name: name },
        { image: imagePath }] }).exec()
   

if (obj )
    {
const filePath = path.join(__dirname, '..', 'public',  obj.image);

        fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Failed to delete file:', err);
            } else {
              console.log('File deleted:', filePath);
            }
          })
        return res.status(400).json({message:'Recipe already exists'})
   }
    
  const newObj=await Recipe.create({name,image:imagePath ,description})

   if(!newObj)
        {
            return res.status(401).json({message:"Somthing wrong"})
        }
   return res.json(newObj)
}

const UpdateRecipe=async (req,res)=>{//העדכון מתבצע לשדות שאני מעונינת
    const {name,description}=req.body

    if (!name||!description){
        return res.status(400).json({message:'Please fill in all required fields'})
    }

    const recipe=await Recipe.findOne({name}).exec()

if (!recipe){

return res.status(400).json({message:'Recipe with this name not found'})}


    if (req.file&&req.file.filename){
const imagePath = req.file ? `uploads/${req.file.filename}` : null

 const filePath = path.join(__dirname, '..','public', recipe.image);

        fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Failed to delete file:', err);
            } else {
              console.log('File deleted:', filePath);
            }
          })

     recipe.image=imagePath
    
    }
 recipe.description=description

    await recipe.save()

    return res.json(recipe)
}

const DeleteRecipe=async(req,res)=>{
    const {name}=req.body

    if (!name){
        return res.status(400).json({message:'Please fill in all required fields'})
    }
const recipe = await Recipe.findOneAndDelete({ name:name }).lean();

if(recipe){
  const filePath = path.join(__dirname, '..','public', recipe.image)

        fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Failed to delete file:', err);
            } else {
              console.log('File deleted:', filePath);
            }
     })}
 
else
      {
        return res.status(400).json({ message: 'recipe not found' })
      }
      return res.json(recipe)
}

const ReadAll=async (req, res)=>{
    const recipes=await Recipe.find().lean()

    if (!recipes){
        return res.status(400).json({message:'The recipe database is empty'})}

    return res.json(recipes)
}

const ReadOne=async (req, res)=>{
    const {name}=req.body

    if (!name){
        return res.status(400).json({message:'Please fill in all required fields'})
    }

    const recipe=await Recipe.findOne({name}).exec()

    if (!recipe){

        return res.status(400).json({message:'Recipe with this name not found'})}

         return res.json(recipe)
}

module.exports={AddRecipe,UpdateRecipe,DeleteRecipe,ReadAll,ReadOne}