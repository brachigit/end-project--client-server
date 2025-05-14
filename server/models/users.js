const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    username:{
        type: String,
        required: true,
        trim:true
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minLength:8
    },

    email:{
        type: String,
        required: true,
        trim:true
    },
    address:{
        type: String
    },
    phone:{
        type: String,    
        minLength:9
        
    },
    rolse:{
        type:String,
        enum:['User', 'Admin'],
        default:"User",
    }


},{timestamps:true}

)
module.exports=mongoose.model('User',userSchema)
