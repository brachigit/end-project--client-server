
const recipe = require("../Models/recipe")
const RecipeBook=require("../Models/recipeBook")
const jwt = require('jsonwebtoken')


const CreateNewBook=async (req,res)=>{
 
const obj = await RecipeBook.findOne({user:req.user._id}).exec()
               
    if (obj){
      return res.status(400).json({message:'Book already exists'})
    }

 const book=await RecipeBook.create({user:req.user._id})

if(!book){
    return res.status(401).json({message:"Somthing wrong"})
}
 return res.json(book)
}

const addRecipe=async(req,res)=>{

const recipeobj=req.body

if(!recipeobj){

    return res.status(400).json({message:'No accept recipe'})
}

    const obj = await RecipeBook.findOne({user:req.user._id}).exec()

    if (!obj){
      return res.status(400).json({message:'Book not exists'})
    }

const updatedBook =await RecipeBook.findByIdAndUpdate(
    
    obj._id,
    {$addToSet:{recipelist:recipeobj.ObjectId }},
    {new:true}

)
if (!updatedBook){
    return res.status(401).json({message:"Somthing wrong"})
}

return res.status(200).json(updatedBook)
}

const DeleteAll=async(req,res)=>{

    const obj = await RecipeBook.findOne({user:req.user._id }).lean()
    if (!obj){
        return res.status(400).json({message:'Book not exists'})
      }
   const recipeBook=await RecipeBook.deleteOne({user: req.user._id }).exec()
   
   if(recipeBook.deletedCount==0)
   
   {
       return res.status(400).json({ message: 'Username not found' })
   }

   return res.send ("deleted")

}

const DeleteOne=async(req,res)=>{

    const id=req.user._id 

    const idRecipe=req.body

    const obj = await RecipeBook.findOne({user:id}).exec()
    if (!obj){
        return res.status(400).json({message:'Book not exists'})
      }

   const lenBook=obj.recipelist.length

    const deleteRecipe =await RecipeBook.findByIdAndUpdate(
    
        obj._id,
        {$pull:{recipelist: idRecipe.ObjectId }},
        {new:true}
    )
    if (deleteRecipe.recipelist.length !== lenBook - 1)
        {
        return res.status(401).json({message:"recipe not delete"})

    }

   return res.send ("deleted")

}

const GetBookRecipe =async(req,res)=>{

    const obj = await RecipeBook.findOne({ user:req.user._id}) .populate("recipelist") // שם השדה של המערך
    .lean();

    if (!obj){
        return res.status(400).json({message:'Book not exists'})
      }

    return res.json(obj)

}



module.exports={
    CreateNewBook,
    addRecipe,
    DeleteAll,
    DeleteOne,
    GetBookRecipe
}



