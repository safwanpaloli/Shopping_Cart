const mongoose = require('mongoose')

const adminLoginSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
     password : {
         type : String ,
         required : true,
     }
})

const admin = mongoose.model('admin', adminLoginSchema)

module.exports = admin ; 