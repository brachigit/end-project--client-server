const Recipe=require("../models/recipe")
const fs = require('fs');
const addRecipe=async(req,res)=>{
  const image=(req.file?.filename?req.file.filename:"")
  const {name,title,ingredients,instructions}=req.body
  if(!name||!title||!ingredients||!instructions){
    return res.status(400).json({massage:"Name title ingreddients and instruction are requierd"})
  }
  const newImage=await Recipe.create({name,image,title,ingredients,instructions,comments :[]})
  if(!newImage){
    return res.status(400).json({massage:"Something wrong"})
  }
  return res.status(200).json(newImage)
}
const getAllRecipe=async(req,res)=>{
  const recipes=await Recipe.find().lean()
  if(!recipes?.length)
  return res.status(400).json({ message: 'No recipes found' })
res.json(recipes)
}
const getRecipeByID=async(req,res)=>{
  const{id}=req.query
  const recipe=await Recipe.findById(id).lean()
  if(!recipe)
  return res.status(400).json({ message: 'This recipe not found' })
res.json(recipe)
}
const getRecipeByName=async(req,res)=>{
  const{name}=req.query;
  const recipe=await Recipe.find({  name: { $regex: name, $options: "i" } }).lean()
  if(!recipe)
  return res.status(400).json({ message: 'This recipe not found' })
res.json(recipe)
}
const updateRecipe=async(req,res)=>{
  const{id}=req.params
  const {name,title,ingredients,instructions}=req.body
  const image=(req.file?.filename?req.file.filename:"")
  if(!name||!title||!ingredients||!instructions){
    return res.status(400).json({massage:"Name title ingreddients and instruction are requierd"})
  }
  const recipe=await Recipe.findById(id).exec()
  if(!recipe)
    return res.status(400).json({ message: 'This recipe not found' })
  const path= './public/uploads/'+ recipe.image
 fs.unlink( path, (err) => {
  if (err) {
    return res.status(400).json({ message: 'This recipe not found' })
}})
  recipe.name=name;
  recipe.ingredients=ingredients;
  recipe.title=title;
  recipe.image=image;
  recipe.instructions=instructions;
  const saveRecipe=await recipe.save()
  res.json(recipe)
}
const deleteRecipe=async(req,res)=>{
  const{id}=req.params
  const recipe=await Recipe.findById(id).exec()
  if(!recipe)
    return res.status(400).json({ message: 'This recipe not found' })
  const image=recipe.image
 const path= './public/uploads/'+ image
 fs.unlink( path, (err) => {
  if (err) {
    return res.status(400).json({ message: 'This recipe not found' })
}})
 
  const deleteRecipe=await recipe.deleteOne()
  res.json(`${recipe.name} delete`)
}
const sortRecipeByName=async(req,res)=>{
 const recipes = await Recipe.find().sort({ name: 1 }); 
 if(!recipes?.length)
  return res.status(400).json({ message: 'No recipes found' })
  res.json(recipes)

}
const sortRecipeByDate=async(req,res)=>{
 const recipes = await Recipe.find().sort({ createdAt: -1 });
 if(!recipes?.length)
  return res.status(400).json({ message: 'No recipes found' })
  res.json(recipes)

}
const Addcomment=async(req,res)=>{
  const {id}=req.params
  const {text}=req.body
  const userId = req.user._id;
  const newComment = {
      user: userId,
      text,
      date: new Date()
    }

const Comment=await Recipe.findByIdAndUpdate(
           id,
           { $addToSet: { comments: newComment } },
            { new: true }
          )
        
    
        if(Comment)
         return res.status(200).json(Comment);
         return res.status(500).json({ error: "Cannot add a comment" });
    
  }
  const getComments=async(req,res)=>{
    const {id}=req.params
    const recipe = await Recipe.findById(id).populate('comments.user', 'username');
    if(!recipe||!recipe.comments||recipe.comments.length==0)
    return res.status(400).json({ message: 'This recipe not found' })
    return res.status(200).json(recipe.comments);
    

  }



module.exports={addRecipe,getAllRecipe,getRecipeByID,updateRecipe,deleteRecipe,getRecipeByName,sortRecipeByDate,sortRecipeByName,Addcomment,getComments}