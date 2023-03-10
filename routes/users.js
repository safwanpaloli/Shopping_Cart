let express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
let {registration,showProducts,login,addtoCarts,displayCarts} = require('../controllers/userControllers')

const verifyToken = (req, res , next ) => {
    let auth  = req.headers.authorization;
    if(auth===undefined){
           return res.status(401).json({error : 'no token provided'})
    }
     
    let token = auth.split(" ")[1]
    jwt.verify(token,"secret",(err)=>{
        if(err){
            return res.status(500).json({error:'authentication failed'})
        }else{
            next()
        }
    })
  }


router.get('/', showProducts)

router.post('/registration',registration) 

router.post('/login', login)

router.post('/add/cart',verifyToken, addtoCarts)

router.post('/displaycart' , verifyToken, displayCarts)


module.exports = router;
