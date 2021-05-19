const Product = require('../models/product');
const {errorHandler} = require('../helpers/dbErrorHandler');
const  formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.create = (req,res,next) =>{
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: "Image Upload Error"
            })
        }
        let product = new Product(fields);

        if(files.photo){
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