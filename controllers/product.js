const Product = require('../models/product');
const {errorHandler} = require('../helpers/dbErrorHandler');
const  formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { exec } = require('child_process');


//get product by id
exports.productByID = (req,res,next, id) =>{
    Product.findById(id).exec((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                error: "Product not Found !"
            })
        }

        req.product = product;
        next();
    })
}


//create product
exports.create = (req,res,next) =>{
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: "Image Upload Error"
            })
        }
      
        const {name, description, price, category, quantity, shipping} = fields;
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "All Fields are Required"
            })
        }

        let product = new Product(fields);

        if(files.photo){

            if(files.photo.size> 1000000){
                return res.status(400).json({
                    error: "Image Should be less than 1MB",
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            return res.json({
               result
            })

        })
    })
}