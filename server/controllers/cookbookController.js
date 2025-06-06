const Cookbook=require("../models/cookbook")

const CreateCookbook=async(req,res)=>{
    const id=req.user._id
    const duplicate = await Cookbook.findOne({user:id}).lean()
    if(duplicate){
           return res.status(409).json({message:"Book already exists"})
           }  
    const book=await (await Cookbook.create({user:id})).save()
    if(book)
    return res.status(200).json(book)
    return res.status(401).json({message:"Somthing wrong"})

   }

const addRecipe=async(req,res)=>{
    const id=req.user._id
    const recipe=req.body
    const duplicate = await Cookbook.findOne({user:id}).exec()
    if(!duplicate){
        duplicate = await Cookbook.create({ user: id });
    }  
    if(!duplicate)
        return res.status(401).json({message:"Somthing wrong"})
    if(!recipe){
        return res.status(409).json({message:"No accept recipe"})
        }

    const newrecipe=await Cookbook.findByIdAndUpdate(
        duplicate._id,
        { $addToSet: { recipeList: recipe._id } },
        { new: true }
      );
      if(newrecipe)
        return res.status(200).json(newrecipe)
        return res.status(401).json({message:"Somthing wrong"})
} 
const DeleteAll =async(req,res)=>{
    const id=req.user._id
    const duplicate = await Cookbook.findOne({user:id}).exec()
    const deleteCookbook=await duplicate.deleteOne()
    res.json(`${duplicate.name} delete`)

}
const DeleteOne =async(req,res)=>{
    const id=req.user._id
    const recipeID=req.params.id
    const duplicate = await Cookbook.findOne({user:id}).exec()
    if(!duplicate){
        return res.status(401).json({message:"You dont have cookbook"})
    }
    const newrecipe=await Cookbook.findByIdAndUpdate(
         duplicate._id,
        { $pull: { recipeList: recipeID } },
        { new: true }
      );
      if(newrecipe)
        return res.status(200).json(newrecipe)
        return res.status(401).json({message:"Somthing wrong"})

}

const GetCookbook=async(req,res)=>{
    const id=req.user._id
    const duplicate = await Cookbook.findOne({user:id}).populate("recipeList").lean()
    if(!duplicate){
        return res.status(401).json({message:"You dont have cookbook"})
    }
    return res.status(200).json(duplicate)

}

module.exports={CreateCookbook,addRecipe,DeleteAll,DeleteOne,GetCookbook}

