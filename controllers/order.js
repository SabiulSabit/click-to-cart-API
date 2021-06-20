const {Order, CartItem} = require('../models/order');
const {errorHandler} = require('../helpers/dbErrorHandler');


//create new order
exports.postCreatOrder = (req,res, next) => {
  req.body.order.user  = req.profile;

  const order = new Order(req.body.order);

  order.save( (err, result)=>{
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
      })
    }else{
      return res.json(result);
    }
  })
}

//get all order list for admin
exports.listOrder = (req,res,next) =>{

}