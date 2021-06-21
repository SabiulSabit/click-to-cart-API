const { rawListeners } = require("../models/user.js");
const User = require("../models/user.js");

//find user by id
exports.userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found",
      });
    }

    req.profile = user;
    next();
  });
};

//read user data
exports.getReadUser = (req, res, next) => {
  req.profile.hashPassword = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

//update user
exports.putUpdateUser = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    {
      $set: req.body,
    },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not apllicable to perform this action",
        });
      }
      user.hashPassword = undefined;
      user.salt = undefined;
      return res.json(user);
    }
  );
};


//add order to history
exports.addOrderToHistory = (req,res,next) =>{
  //next()
  let history = [];
  req.body.order.products.forEach((item)=>{
    history.push({
      id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount
    });
  })
  
  User.findOneAndUpdate({_id: req.profile._id}, {$push: {history: history}}, {new: true}, (err, data)=>{
    if(err){
      return res.status(400).json({
        error: "Can't Update The User History"
      })
    }else{
      next();
    }
  })
}


//get user order history
exports.orderHistory = (req,res,next) => {
  
}
