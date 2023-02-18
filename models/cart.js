const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    user_id : {
        type : String ,
        required : false
    },
        cartItems :[{
            productId: String,
            productname: String,
            quantity: String,
        }] 
    
       
    })

const cart = mongoose.model('cart', cartSchema)

module.exports = cart;