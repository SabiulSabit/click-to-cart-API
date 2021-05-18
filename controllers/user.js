const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt')
const {errorHandler} = require('../helpers/dbErrorHandler')


//user signup
exports.signup = (req,res,next) =>{
    //console.log(req.body);
    const user = new User(req.body);
    user.save( (err,user)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }

        user.salt = undefined;
        user.hashPassword = undefined;
        return res.json({
            user
        })
    });
 }


 //user sign in
 exports.signin = (req,res,next) =>{
         
    const {email, password} = req.body;

    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                err: "Email is Not Registred!! Please Signup First"
            });
        }
    })
 }