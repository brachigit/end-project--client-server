
const mongoose=require('mongoose')

const RecipeBookSchema=mongoose.Schema({
recipelist:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
  }] ,

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Users"
        }
},
{
   timestamps:true
})

module.exports=mongoose.model('RecipeBook',RecipeBookSchema)