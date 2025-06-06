const mongoose=require("mongoose")

const CookbookSchema=new mongoose.Schema({
    recipeList:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "recipe"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
        }
},{})
module.exports=mongoose.model('cookbook',CookbookSchema)

