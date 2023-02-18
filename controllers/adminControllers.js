const Product = require('../models/Product_Schema');
const admin = require('../models/admin_Schema')
const jwt = require('jsonwebtoken');
     

exports.adminLogin = async(req,res) => {
    const {username , password} = req.body
    const oneDay = 1000 * 60 * 60 * 24;
    const checkAdmin = await admin.findOne({username : username})
     
    if(!checkAdmin){
        return res.json('admin is not found')
       }else if(checkAdmin && checkAdmin.password === password){
            response = {
                 id : checkAdmin._id,
                 display_name : checkAdmin.username
            }
            const token = jwt.sign(response,"secret",{expiresIn: oneDay})
            return res.json({auth : true , token : token})
       }else{      
            res.json("something wrong").status(500)
       }


}


exports.addtoProduct = async(req, res)=>{
    const product_name = req.body.product_name;
    const description = req.body.description;
    const price = req.body.price

    const existingProduct = await Product.findOne({ product_name: product_name });
        if (existingProduct) {
                 return res.status(400).json({ error: 'product is already exists' });
         }

    const add_Product = new Product({product_name, description, price});
    try {
        await add_Product.save();
        return res.json({ success: true, Product: add_Product });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while adding new Product' });
} 
}

exports.deleteProduct = async (req,res)=>{
    const product_id = req.params.productid   
    try {
        await Product.findByIdAndDelete(product_id)
        return res.json({success : true , message : 'product is delete'})
    }
    catch (error){
             return res.json('error').status(500)
    }
}
