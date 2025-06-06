const bcrypt =require('bcrypt')
const Users=require('../Models/user')


const AddAdmin= async(req,res)=>
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
    
    await Users.create( {name,username,role:"admin",password:hashedPwd,email,address,phone})
    
    const users=await Users.find().lean()
   
      return res.json(users)
}



 const ReadAllUsers= async (req,res)=>{

 const users=await Users.find().lean()

 if(!users){
    
   return res.status(400).json({messege:'No users found'})
 }

 res.json(users)

}

const getUserBySkip=async(req,res)=>{
  const { skip, limit } = req.query;
  const skipNumber = parseInt(skip) || 0;
  const limitNumber = parseInt(limit) || 5;
  const users=await User.find().skip(skipNumber).limit(limitNumber)
  const totalCount = await User.countDocuments();
  if(!users?.length)
      return res.status(400).json({ message: 'No users found' })
  res.json({
    data: users,
    totalCount,
  })
 }
 const ReadUserById =async(req,res)=>{

  const{id}=req.params
  
  const user=await User.findById(id).lean()

  if(!user)
      return res.status(404).json({messege:'this user not found'})

  res.json(user)
}

 const UpdateUsers=async(req,res)=>{

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

 const DeleteUsers= async (req,res)=>{

  
 const {username}=req.query

 if(!username)
 {
   return res.status(400).json({ message: 'not accept username' })
}
// if(!req.use||req.use.username!==username){
//   return res.status(400).json({ message:'user can delete only herself' })
// }
const user=await Users.deleteOne({username}).exec()

if(user.deletedCount==0)

{
    return res.status(400).json({ message: 'Username not found' })
}
 
  const users=await Users.find().sort({_id:1}).lean()
   
  return res.json(users)
}

const ReadUserBySkip=async(req,res)=>{

  const { skip, limit } = req.query

  const skipNumber = parseInt(skip) || 0

  const limitNumber = parseInt(limit) || 5

  const users=await User.find().skip(skipNumber).limit(limitNumber)

  const totalCount = await User.countDocuments()

  if(!users?.length)

      return res.status(400).json({ message: 'No users found' })

  res.json({
    data: users,
    totalCount,
  })
 }



module.exports={AddAdmin,ReadAllUsers,DeleteUsers,ReadUserBySkip,ReadUserById,UpdateUsers}


