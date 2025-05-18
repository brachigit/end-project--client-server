const Recipe=require("../models/recipe")
const fs = require('fs');
const addRecipe=async(req,res)=>{
  const image=(req.file?.filename?req.file.filename:"")
  const {name,title,ingredients,instructions}=req.body
  if(!name||!title||!ingredients||!instructions){
    return res.status(400).json({massage:"Name title ingreddients and instruction are requierd"})
  }
  const newImage=await Recipe.create({name,image,title,ingredients,instructions})
  if(!name){
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
  const{id}=req.params
  const recipe=await Recipe.findById(id).lean()
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
module.exports={addRecipe,getAllRecipe,getRecipeByID,updateRecipe,deleteRecipe}