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

// const UpdateUsers=async(req,res)=>{

// const  {name,username,email,address,phone} = req.body

// if(!name||!username||!email||!address)
// {
//     return res.status(400).json({message:'fields are required'})
// }

// const user=await Users.findOne({username}).exec()

// if (!user){

// return res.status(400).json({message:'Users with this title not found'})}

// user.name=name
// user.email=email
// user.address=address
// user.phone=phone

// await user.save()

// const users=await Users.find().sort({_id:1}).lean()
   
// return res.json(users)
// }

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

// module.exports={CreateNewUsers
//                ,ReadAllUsers,
//                 UpdateUsers, 
//                 DeleteUsers}

module.exports={AddAdmin,ReadAllUsers,DeleteUsers}


