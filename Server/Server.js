const express = require('express')  
require("dotenv").config()
const mongoose=require('mongoose')
const cors=require('cors')
const path = require('path');

const corsOption =require('./Config/corsOpertion')


const app = express()

const PORT= process.env.PORT||3000

app.use(cors(corsOption))

app.use(express.json())

const connectDB=require("./Config/dbconn")

connectDB()

app.use("/api/Users", require("./Router/UserRouter"))
app.use("/api/auth", require("./Router/authRouter"))
app.use("/api/recipe",require("./Router/recipeRouter"))
app.use("/api/recipeBook",require("./Router/repiceBookRouter"))

app.use('/public', express.static(path.join(__dirname, 'public')));


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
    })
    mongoose.connection.on('error', err => {
    console.log(err)
    })