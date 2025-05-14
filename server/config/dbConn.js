const moongos=require('mongoose')
const connectDB = async () => {
try{
   await moongos.connect(process.env.DATABASE_URI)
}
catch (err) {
    console.error("error connection to DB\n" + err)
}
}
module.exports = connectDB
