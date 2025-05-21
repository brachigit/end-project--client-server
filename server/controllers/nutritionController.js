const Nutrition=require("../models/nutritionitem")

const addNutrition=async(req,res)=>{
    const {name,nutrientType}=req.body
  if(!name||!nutrientType){
    return res.status(400).json({massage:"Name and nutrientType are requierd"})
  }
  const newNutrition=await Nutrition.create({name,nutrientType})
  if(!newNutrition){
    return res.status(400).json({massage:"Something wrong"})
  }
  return res.status(200).json(newNutrition)
}
const getNutritionByType=async(req,res)=>{
     const {nutrientType}=req.body
     if(!nutrientType){
    return res.status(400).json({massage:"Not found type"})}
    const nutritions=await Nutrition.find({nutrientType:nutrientType}) 
    if(!nutritions?.length)
      return res.status(400).json({ message: 'No nutritions found' })
    res.json(nutritions)
}
const getNutritionByID=async(req,res)=>{
    const{id}=req.params
    const nutrition=await Nutrition.findById(id).lean()
    if(!nutrition)
      return res.status(400).json({ message: 'nutrition not found' })
    res.json(nutrition)
}
const updateNutrition=async(req,res)=>{
   const{id}=req.params 
   const {name,nutrientType}=req.body
  if(!name||!nutrientType){
    return res.status(400).json({massage:"Name and nutrientType are requierd"})
  }
  const nutrition= await Nutrition.findById(id).exec()
  if(!nutrition)
      return res.status(400).json({ message: 'nutrition not found' })
   nutrition.name=name 
   nutrition.nutrientType=nutrientType
   const updetnutrition=await nutrition.save()
   res.json(nutrition)

}
const deleteNutritionByID=async(req,res)=>{
    const{id}=req.params 
    const nutrition= await Nutrition.findById(id).exec()
  if(!nutrition)
      return res.status(400).json({ message: 'nutrition not found' })
    const updetnutrition=await nutrition.deleteOne()
   res.json(nutrition)

}
 module.exports={addNutrition,getNutritionByType,getNutritionByID,updateNutrition,deleteNutritionByID}