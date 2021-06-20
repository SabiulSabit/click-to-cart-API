const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");


//get order by id
exports.orderByID = (req,res,next, id) => {
   Order.findById(id)
   .populate('products.prodcut', "name price")
   .exec( (err, result) =>{
      if(err || !result){
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      else{
        req.order = result;
        next();
      }
   } )
   
}

//create new order
exports.postCreatOrder = (req, res, next) => {
  req.body.order.user = req.profile;

  const order = new Order(req.body.order);

  order.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      return res.json(result);
    }
  });
};

//get all order list for admin
exports.listOrder = (req, res, next) => {
  //console.log(req.params.userId)
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        //console.log(order);
        return res.json(order);
      }
    });
};


//get order status value
exports.getStatusValues = (req,res,next) =>{
  return res.json(Order.schema.path('status').enumValues);
}

//update order status
exports.updateOrderStatus = (req,res,next) =>  {

}