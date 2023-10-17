const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
companyName:{
    type: String,
    required:true
},
logoUrl:{
    type: String,
    required: true
},
position:{
    type: String,
    required: true
},
salary:{
    type: Number,
    required: true
},
jobType:{
    type: String,
    required: true
},
remote:{
    type: String,
    required: true
},
location:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
about:{
    type: String,
    required: true
},
skills:{
    type: [String],
    required: true
},
information:{
    type: String,
    required: true
},
})

module.exports=mongoose.model('Job',jobSchema)