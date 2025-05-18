require("dotenv").config()
const mongoose = require('mongoose')
const express=require('express')
const cors = require("cors")
const app=express()
const PORT=process.env.PORT||1500
const corsOptions=require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const createInitialAdmin=require("./config/initAdmin")
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('public'));
app.use("/api/auth", require("./routers/authRouter"))
app.use("/api/user", require("./routers/userRouter"))
app.use("/api/recipe",require("./routers/recipeRouter"))
app.use("/api/cookbook",require("./routers/cookbookRouter"))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    createInitialAdmin()
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
})
mongoose.connection.on('error', err => {
console.log(err)
})



