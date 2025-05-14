const User=require('../models/users')
const bcrypt= require('bcrypt') 

    const creatNewUser=async(req,res)=>{
        const{name,username,password,email,address,phone}=req.body
    if (!name ||!username|| !password || !email) {
        return res.status(400).json({message:'All fields are required'})
        }
   if (password.length<8||phone.length!=10){
            return res.status(401).json({message:'Unauthorized'})
           }
    const duplicate = await User.findOne({username}).lean()
        if(duplicate){
        return res.status(409).json({message:"Duplicate username"})
        }    
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject={name,username,password:hashedPwd,email,address,phone,roles:'User'}  
    const user = await User.create(userObject)
    if (user) { 
        return res.status(201).json({message:`New user ${user.name}
        created` })
        } else {
        return res.status(400).json({message:'Invalid user received'})
        }  

   }
   const creatNewManager=async(req,res)=>{
    const{name,username,password,email,address,phone}=req.body
    if (!name ||!username|| !password || !email) {
    return res.status(400).json({message:'All fields are required'})
    }
    if (password.length<8||phone.length!=10){
        return res.status(401).json({message:'Unauthorized'})
       }
     const duplicate = await User.findOne({username}).lean()
    if(duplicate){
    return res.status(409).json({message:"Duplicate username"})
    }    
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject={name,username,password:hashedPwd,email,address,phone,roles:'Admin'} 
    const user = await User.create(userObject)
if (user) { 
    return res.status(201).json({message:`New user ${user.name}
    created` })
    } else {
    return res.status(400).json({message:'Invalid user received'})
    }  

}

   const getAllUser =async(req,res)=>{
    const users=await User.find().lean()
    if(!users?.length)
        return res.status(400).json({ message: 'No users found' })
    res.json(users)
   }
   const getUserById =async(req,res)=>{
    const{id}=req.params
    
    const user=await User.findById(id).lean()
    if(!user)
        return res.status(404).json({messege:'this user not found'})
    res.json(user)
}
const updateUser=async(req,res)=>{
    const{id}=req.params
     const{name,username,password,email,address,phone}=req.body
        if(!name||!username||!password||!email)
      return res.status(404).json({messege:'name, username ,password and email must to be!'})
        if (password.length<8||phone.length!=10){
            return res.status(401).json({message:'Unauthorized'})
         }
       const user=await User.findById(id).exec()
    if(!user)
        return res.status(404).json({messege:'this user not found'})
    const hashedPwd = await bcrypt.hash(password, 10)
    const sameName=await User.findOne({username:username ,_id:{$ne:id}}).exec()
    if(sameName)
        return res.status(404).json({messege:'Can`t add this user'})
    user.name=name
    user.username=username
    user.password=hashedPwd
    user.email=email
    user.address=address
    user.phone=phone
    user.roles='User'
    const update=await user.save()
    res.json(user)

}
const deleteUser=async(req,res)=>{
    const{id}=req.params
    const user=await User.findById(id).exec()
    if(!user)
        return res.status(404).json({messege:'this user not found'})
    const userdelete=await user.deleteOne()
    res.json(`${user.name} delete`)
}
module.exports={creatNewUser,getUserById,updateUser,deleteUser,getAllUser,creatNewManager}
