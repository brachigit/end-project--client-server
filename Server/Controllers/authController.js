const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Users=require('../Models/user')


const Register= async(req,res)=>
{
    const {name,username,password,email,address,phone}=req.body

    if(!name||!username||!email||!address||!password)
        {
       return res.status(400).json({message:'Please fill in all required fields'})
        }
    if (password.length<8||(phone && phone.length!=10)){

      return res.status(401).json({message:'Unauthorized'})
   }    
   const obj = await Users.findOne({username}).exec()

    if (obj){
      return res.status(400).json({message:'User already exists'})
    }

    const hashedPwd= await bcrypt.hash(password,10)
    
   const obj2=await Users.create( {name,username,role:"user",password:hashedPwd,email,address,phone})
    
     
    const userInfo={_id:obj2._id,name:obj2.name
      ,username:obj2.username,role:obj2.role,email:obj2.email}
    
      const accesstoken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    
       return res.json({accesstoken:accesstoken})
    
}


const Login = async (req, res )=>{

    const {username,password}=req.body
   
     if(!username||!password)
       {
           return res.status(400).json({message:'Please fill in all required fields'})
       }
       const obj = await Users.findOne({username}).exec()
   
       if (!obj){
       return res.status(401).json({message:'User not exists'})
       }
   
       const match = await bcrypt.compare(password,obj.password)
   
       if(!match) {
         return res.status(401).json({message:'Unauthorized'})
       }
   
   const userInfo={_id:obj._id,name:obj.name
     ,username:obj.username,role:obj.role,email:obj.email}
   
     const accesstoken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
   
      return res.json({accesstoken:accesstoken})
   
   }

  module.exports={Register,Login}
   