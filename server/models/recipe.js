const mongoose=require("mongoose")
const recipeSchema=new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
      type:String

    }
},{timestamps:true})
module.exports=mongoose.model('recipe',recipeSchema)
