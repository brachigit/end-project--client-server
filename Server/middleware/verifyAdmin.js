
const varifyAdmin= (req,res,next)=>{ 

if(req.user&&req.user.role==="admin"){
   next()
}
else
return res.status(401).json({ message: 'No access permission' })

}

module.exports = varifyAdmin