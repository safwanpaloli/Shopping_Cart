const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user_Schema')
const Cart = require('../models/cart')
const Product = require('../models/Product_Schema')

exports.registration = async (req,res) => {
        const first_name = req.body.first_name;
        const email = req.body.email;
        const phone = req.body.phone
        const password = req.body.password;

         // Check if email or phone already exists
        const existingUser = await User.findOne({ $or: [{ email : email}, { phone : phone }] });
        if (existingUser) {
                 return res.status(400).json({ error: 'Email or phone already exists' });
         }
        
        const hashedPassword=await bcrypt.hash(password,(12))
        const newUser = new User({first_name, email, phone, password : hashedPassword });
         try {
             await newUser.save();
             return res.json({ success: true, user: newUser });
         } catch (err) {
             return res.status(500).json({ error: 'An error occurred while registering user' });
  }
  }
 

exports.login = async (req,res) =>{
        const emailOrMobileNumber = req.body.email_or_phone;
        const password = req.body.password

        const oneDay = 1000 * 60 * 60 * 24;
        let user;
        if(emailOrMobileNumber.includes('@')){
             user = await User.findOne({email : emailOrMobileNumber})
        }else{
             user = await User.findOne({phone : emailOrMobileNumber})
        }

        let userPassword = user.password
        //dcrypt the password
        const dcryptedPassword =await  bcrypt.compare(password,userPassword)
        
        // If user with email/phone and password is found, return success message and user details
        if (user && dcryptedPassword) {
          userData = {
             id : user._id,
             email : user.email,
             phone : user.phone
          }
          const token = jwt.sign(userData,"secret",{expiresIn: oneDay})
          return res.json({auth : true , token : token})
        } else {
                 return res.json({ success: false, message: 'Incorrect email/phone or password' });
               }
}

exports.showProducts = async (req,res) =>{
    try {
        const fetchData = await Product.find()
        return res.json({success : true ,fetchData})
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while getting products' });
    }
}    


exports.addtoCarts = async (req,res) => {
    var {product_Id,quantity} = req.body;
    
    let auth  = req.headers.authorization;
    let token = auth.split(" ")[1]
    let decodetoken =JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    let userId = decodetoken.id
    //Check if user is registrated
    // Find the user by ID
     const user = await User.findById(userId);
     if (!user) {
       return res.status(400).json({ error: 'User not found' });
     }

     //find the product is add in product item
      // Find the product by ID
      let product = await Product.findById(product_Id);
      if (!product) {
         return res.status(400).json({ error: 'Product not found' });
    }



    //check user in cart 
     let cart = await Cart.findOne({user_id : userId})


     if (cart) {

     let itemIndex = cart.cartItems.findIndex(p => p.productId == product_Id);
      
       if (itemIndex >= 0) {
    
           //product exists in the cart, update the quantity
            let productItem = cart.cartItems[itemIndex];
             productItem.quantity = quantity;
             cart.cartItems[itemIndex] = productItem;
             cart = await cart.save()
             return res.json({success : true , cart})
        } else {
          //product does not exists in cart, add new item
          cart.cartItems.push({productId : product_Id, productname : product.product_name , quantity : quantity});
          cart = await cart.save();
          return res.status(201).send(cart);
        }
    }else{
      const newCart = new Cart({
        user_id : userId,
    cartItems : [{
      productId :  product._id,
      productname : product.product_name,  
      quantity :  quantity
    }]
       
      });
      await newCart.save();

      return res.json(newCart).status(201)
    }
}

exports.displayCarts = async (req,res) => {

        let auth  = req.headers.authorization;
        let token = auth.split(" ")[1]
        let decodetoken =JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

        let userId = decodetoken.id
      
       let checkUser = await Cart.findOne({user_id : userId})
        try {
          if(checkUser){
            return res.json({success : true, cartlist : checkUser})   
        }else{
            return res.json({message:'user have not cartItems'})
        }
 
        } catch (error) {
           return res.status(500).json({error: 'An error occurred while getting products'})
        }
      
}

