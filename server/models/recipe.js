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
    title: {
      type: String,
      required: true
    },
    ingredients: {
      type: String, 
      required: true
    },
    instructions: {
      type: String, 
      required: true
    },
    comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
 
},{timestamps:true})
module.exports=mongoose.model('recipe',recipeSchema)
