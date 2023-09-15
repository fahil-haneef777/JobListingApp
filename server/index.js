const express = require('express');
const bodyparser=require('body-parser');
const env=require('dotenv').config()
const mongoose=require('mongoose')
const app=express();

app.use(bodyparser.urlencoded({extended:false}));


app.get('/',(req,res)=>{
    res.json({status:'Success'})
})

app.get('/health',(req,res)=>{
    res.status(200).json({status:'Ok',message:'Server is up and running'})
});



app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log('Server running successfully and connected to db')})
    .catch(error=>console.log(error))

})