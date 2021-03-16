
      //dependencies
const jwt = require('jsonwebtoken'),
      express = require('express'),
      router = express.Router(),
      //validation / middleware
      {check, validationResult} = require('express-validator'),
      auth = require('../middleware/auth'),
      //models
      Cart = require('../models/Cart'),
      User = require('../models/User'),
      Product = require('../models/Product'),
      //config
      config = require('config');



router.post('/add-to-cart',[
      auth,
      check('productId','productId is required').not().isEmpty(),
      check('quantity', 'quantity is required').not().isEmpty()

] ,   async (req,res) => {
        //checks field validation
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(400).json({errors:errors.array()});
        };

        //Takes token from the header
        const token = req.header('x-auth-token');
        if (!token){
            return res.status(401).json({ msg: 'no token, auth denied'});
        }

        //decode token and find associated user
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        let userPayload = decoded.user;
        

        //build cart object
        try{
            //populate from request body
            const {productId, quantity} = req.body;
            //find User using the payload
            let user = await User.findById(userPayload.id);
            //get the product from db
            let product = await Product.findById(productId);
            
            //calculate price of item(s) added to cart
            let total = ( quantity * product.price);

            //create cart object 
            //Check to see if cart already exists
            let iscart = await Cart.findOne({user:user});
            //there is an existing cart
            
            if(iscart){
                let found = false;
                let i=0;
                for (i=0;i<iscart.orderItems.length;i++)
                {
                    console.log(iscart.orderItems[i]);
                    if(iscart.orderItems[i].product._id.toString() == product._id.toString()){
                        found=true;
                        console.log('found that product!');
                        iscart.orderItems[i].qty += quantity;
                        iscart.orderItems[i].total = product.price * iscart.orderItems[i].qty;
                        try{
                            iscart.markModified('orderItems');
                            await iscart.save();
                            console.log(iscart); 
                            }
                        catch(err){
                            console.error(err);
                            res.status(500).send('server error');
                        }
                        res.status(200).send(iscart.orderItems[i]);
                        break;
                    }
                }
                if(!found){
                    await Cart.updateOne(
                        {user:iscart.user},
                        {$push:{orderItems:
                            { 
                            product:product,
                            qty:quantity,
                            total:total 
                            }}
                        }
                        )
                        res.status(200).send('product pushed to orderItems')
                }
            }
            //there isnt an existing cart so we create one
            else{
                const cart = new Cart({
                    user,
                    orderItems:
                   { product:product,
                    qty:quantity,
                    total:total
                   }
                })

                await cart.save();
               
                res.status(200).send('cart created and saved');
            }
            
            
            
        }
        catch(err){
            console.error(err);
            res.status(500).send('server error');
        }

})

module.exports = router;
    