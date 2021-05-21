const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { exec } = require("child_process");

//get product by id
exports.productByID = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not Found !",
      });
    }

    req.product = product;
    next();
  });
};

//get product
exports.read = (req, res, next) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//create product
exports.create = (req, res, next) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image Upload Error",
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All Fields are Required",
      });
    }

    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image Should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json({
        result,
      });
    });
  });
};

//remove product
exports.remove = (req, res, next) => {
  let product = req.product;
  product.remove((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    return res.json({
      message: "Prodcut deleted Successfully",
    });
  });
};

//update product
exports.update = (req, res, next) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image Upload Error",
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All Fields are Required",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image Should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json({
        result,
      });
    });
  });
};

//sell // arrival

//get all product
exports.getAll = (req, res, next) => {
  //filter field data
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? req.query.limit : 6;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error: "Products not Found"
            })
        }
        return res.send(products);
    });
};
