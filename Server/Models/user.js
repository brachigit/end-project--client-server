
const mongoose=require('mongoose')

const Userschema=new mongoose.Schema(
{
name:{
    type:String,
    required:true
},

username:{
    type:String, 
     unique: true ,
    required:true
  
},
role:{
    type:String, 
   required:true,
   enum:["user","admin"]
},

password:{
    type:String, 
    required:true,
    trim:true,
    minLength:8
  }  ,

email:{
    type:String,
    required:true
    
},

address:{
    type:String
},
phone:{
    type:String,
    minLength:9
}},
 {
    timestamps:true
 }
)

module.exports=mongoose.model('Users',Userschema)