const Nutrition=require("../models/nutritionitem")
const nodemailer = require('nodemailer');


const addNutrition=async(req,res)=>{
    const {name,nutrientType}=req.body
  if(!name||!nutrientType){
    return res.status(400).json({massage:"Name and nutrientType are requierd"})
  }
  const newNutrition=await Nutrition.create({name,nutrientType})
  if(!newNutrition){
    return res.status(400).json({massage:"Something wrong"})
  }
  return res.status(200).json(newNutrition)
}
const getNutritionByType=async(req,res)=>{
     const {nutrientType}=req.params
     if(!nutrientType){
    return res.status(400).json({massage:"Not found type"})}
    const nutritions=await Nutrition.find({nutrientType:nutrientType}) 
    if(!nutritions?.length)
      return res.status(400).json({ message: 'No nutritions found' })
    res.json(nutritions)
}
const getNutritionByID=async(req,res)=>{
    const{id}=req.params
    const nutrition=await Nutrition.findById(id).lean()
    if(!nutrition)
      return res.status(400).json({ message: 'nutrition not found' })
    res.json(nutrition)
}
const updateNutrition=async(req,res)=>{
   const{id}=req.params 
   const {name,nutrientType}=req.body
  if(!name||!nutrientType){
    return res.status(400).json({massage:"Name and nutrientType are requierd"})
  }
  const nutrition= await Nutrition.findById(id).exec()
  if(!nutrition)
      return res.status(400).json({ message: 'nutrition not found' })
   nutrition.name=name 
   nutrition.nutrientType=nutrientType
   const updetnutrition=await nutrition.save()
   res.json(nutrition)

}
const deleteNutritionByID=async(req,res)=>{
    const{id}=req.params 
    const nutrition= await Nutrition.findById(id).exec()
  if(!nutrition)
      return res.status(400).json({ message: 'nutrition not found' })
    const updetnutrition=await nutrition.deleteOne()
   res.json(nutrition)

}

const deleteNutritionByName=async(req,res)=>{

    const name = decodeURIComponent(req.params.name);
    const nutrientType = decodeURIComponent(req.params.nutrientType);
    const nutrition = await Nutrition.findOne({ name, nutrientType }).exec();

    if(!nutrition)
      return res.status(400).json({ message: 'nutrition not found' })

    const updetnutrition=await nutrition.deleteOne()

    res.json(nutrition)

}
const SendMail=async(req,res)=>{
  const { email, pdfContent } = req.body;

  // כאן יוצרים את הקובץ בפורמט PDF או פשוט טקסט (לצורך הדוגמה, טקסט פשוט)
  const pdfText = pdfContent.join('\n');

  // הגדרת ה- SMTP של הדוא"ל (כדאי להשתמש ב- Gmail או שירות דומה)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'תפריט דיאטה - PDF',
    text: 'מצורף קובץ עם סיכום התפריט.',
    attachments: [
      {
        filename: 'diet-summary.txt', // תוכל לשנות ל diet-summary.pdf אם תייצר PDF אמיתי
        content: pdfText,
        contentType: 'text/plain', // או application/pdf אם PDF אמיתי
      },
    ],
  };

  try {

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'המייל נשלח בהצלחה!' });

  } 
  catch (error) {
    res.status(500).json({ success: false, message: 'שגיאה בשליחת המייל', error });
  }}


 module.exports={addNutrition,getNutritionByType,getNutritionByID
  ,updateNutrition,deleteNutritionByID,SendMail,deleteNutritionByName}