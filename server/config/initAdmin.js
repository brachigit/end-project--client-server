
const bcrypt = require('bcrypt');
const User = require("../models/users");
const createInitialAdmin = async () => {
  const adminExists = await User.findOne({ roles: 'Admin' });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: 'Admin',
      username:process.env.ADMIN_USER_NAME,
      address:process.env.ADMIN_ADDRESS,
      email: process.env.ADMIN_EMAIL,
      phone:process.env.ADMIN_PHONE,
      password: hashedPassword, 
      roles:'Admin',
    });

    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin already exists');
  }
};

module.exports= createInitialAdmin;

