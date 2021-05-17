const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler')



exports.signup = (req,res,next) =>{
    //console.log(req.body);
    const user = new User(req.body);
    user.save( (err,user)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        return res.json({
            user
        })
    });
 }
