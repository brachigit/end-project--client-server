
const mongoose=require('mongoose')

const RecipeSchema=new mongoose.Schema({

name:{
    type:String,
    unique: true ,
    required:true
},
image:{
    type:String,
    unique: true ,
    required:true
},
description: {
    title: {
      type: String,
      required: true
    },
    ingredients: {
      type: [String], 
      required: true
    },
    instructions: {
      type: [String], 
      required: true
    }
  }}
,
 {
    timestamps:true
 })

 module.exports=mongoose.model('Recipe',RecipeSchema)
