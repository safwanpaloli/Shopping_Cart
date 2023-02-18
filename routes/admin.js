let express = require('express');
let router = express.Router();
const {addtoProduct, deleteProduct,adminLogin} = require('../controllers/adminControllers')

const verifyToken = (req, res , next ) => {
    let auth  = req.headers.authorization;
    if(auth===undefined){
            res.status(401).json({error : 'no token provided'})
    }
     
    let token = auth.split(" ")[1]
    jwt.verify(token,"secret",(err)=>{
        if(err){
            res.status(500).json({error:'authentication failed'})
        }else{
            next()
        }
    })
  }

router.post('/login',  adminLogin)

router.post('/api/add/product',verifyToken, addtoProduct)


module.exports = router;
