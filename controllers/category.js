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

//get category by id
exports.categoryByID = (req,res,next, id) =>{
    Category.findById(id).exec((err, category)=>{
        if(err|| !category){
            return res.status(4004).json({
                error: errorHandler(err),
            })
        }

        req.category = category;
        next();
    })
}