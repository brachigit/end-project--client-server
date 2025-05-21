const User = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const foundUser = await User.findOne({ username: username}).lean();
    if(!foundUser){
        return res.status(401).json({ message: 'Unauthorized' });
    }
     
      const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ message: 'Unauthorized' });

    const userInfo = {
        _id: foundUser._id,
        name: foundUser.name,
        username: foundUser.username,
        email: foundUser.email,
        address: foundUser.address,
        phone: foundUser.phone,
        roles:foundUser.roles
    };

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    return res.json({  accessToken});
   
    

    
};

const register = async (req, res) => {
       const{name,username,password,email,address,phone}=req.body
       if (!name ||!username|| !password || !email) {
           return res.status(400).json({message:'All fields are required'})
           }
        const duplicate = await User.findOne({username}).lean()
           if(duplicate){
           return res.status(409).json({message:"Duplicate username"})
           }    
       const hashedPwd = await bcrypt.hash(password, 10)
       const userObject={name,username,password:hashedPwd,email,address,phone,roles:'User'}  
       const user = await User.create(userObject)
       if (user) { 
        const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
           return res.json({ accessToken });
                     
           } else {
           return res.status(400).json({message:'Invalid user received'})
           } 
     
};

module.exports = { login, register };
