const User = require('../models/user.js');

//find user by id
exports.userByID = (req,res,next, id) =>{
    User.findById(id).exec( (err,user) =>{
        if(err || !user){
            return res.status(400).json({
                error: "User not Found"
            })
        }

        req.profile = user;
        next();
    } )
}


//read user data
exports.getReadUser = (req,res,next) =>{
     req.profile.hashPassword = undefined;
     req.profile.salt = undefined;

     return res.json(req.profile);

}

//update user
exports.putUpdateUser = (req,res,next) =>{

}