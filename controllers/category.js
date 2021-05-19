const Category = require('../models/category.js');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = (req, res,next) =>{

   const category = new Category(req.body);
   category.save((err,data)=>{
        if(err){
            return res.status(4004).json({
                error: errorHandler(err),
            })
        }

        return res.json({
            data
        })
   })

}