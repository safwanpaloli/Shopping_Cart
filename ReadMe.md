## SHOPPING CART

### Technology

#### The application is built with:
    
    expressjs : 4.16.1
    nodejs : v16.16.0
    mongoose : 6.9.1
    jsonwebtoken : 9.0.0
    bcrypt : 5.1.0
    
### Features

 #### The application displays a Product, that contains  product description and price.

#### Users can do the following:   
   - create account and login 
   - display the product 
   - Add to cart and also include quantity change 
  
#### Admins can do the following:
  - Login 
  - Add Products
  - Delete Products
 
### Database

 #### adminSchema 
     
    username : (String)
    password : (String)
    status  : (String)
    
#### UserSchema 
     
      first_name (String)
      email (String)
      phone (Number)
      password (String)
    
 #### ProductSchema
 
    Product name : (String)
    description : (String)
    price : (Number)
   
#### Cart 
         user_id  : (String)
            cartItems :[{
             productId: String,
             productname: String,
             quantity: Number,
        }] 
      
