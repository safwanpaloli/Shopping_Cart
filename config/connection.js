const  mongoose = require('mongoose')
const  {mongodburl} = require('../constant/url')

const connectDb = async() =>{
    try {
        await mongoose.connect(mongodburl)
        console.log("database is connected")
    } catch (error) {
        console.log('failed to connect db')
        process.exit(1)
    } 
} 



module.exports= connectDb