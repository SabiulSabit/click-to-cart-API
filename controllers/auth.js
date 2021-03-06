const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt')
const { errorHandler } = require('../helpers/dbErrorHandler');
require('dotenv').config();


//user signup
exports.signup = (req, res, next) => {
    //console.log(req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            //console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
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
exports.signin = (req, res, next) => {

    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email is Not Registred!! Please Signup First"
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password dont Match"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 9999 });

        const { _id, name, email, role } = user;
        return res.json({
            token,
            user: {
                _id,
                email,
                name,
                role
            }
        })

    })
}

//user signout
exports.signout = (req, res, next) => {
    res.clearCookie('t');
    res.json({ message: "Signout Successfully" });
}


//require sign in
exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})


//check if the user is authentic
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth.id;

    //console.log(req.profile,  req.auth );
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}


//check if the user is admin
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin Resource! Access Denied"
        })
    }

    next();
}