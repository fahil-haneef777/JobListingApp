const express = require('express');
const bodyparser = require('body-parser');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes=require('./Routes/auth');
const jobRoutes=require('./Routes/job')
const User=require('./models/user')
const cors=require('cors')


const app = express();


app.use(cors())
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());




app.get('/', (req, res) => {
    console.log(res)
    res.json({status: 'Success'})
})

app.get('/health', (req, res) => {
    res.status(200).json({status: 'Ok', message: 'Server is up and running', Time: new Date()})
});

app.use(authRoutes)
app.use(jobRoutes) 


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true}).then(() => {
        console.log('Server running successfully and connected to db')
    }).catch(error => console.log(error))

})
