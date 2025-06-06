const mongoose=require("mongoose")
const nutritionSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
        
    },
    nutrientType:{
        type: String,
        enum:['Fat', 'Dairy Protein','Meat Protein','Fruit','Carbohydrate'],
        required: true
    }

},{})
module.exports=mongoose.model('nutrition',nutritionSchema)