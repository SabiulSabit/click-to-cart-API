const Category = require('../models/Category.js');
const { errorHandler } = require('../helpers/dbErrorHandler');

//create new category
exports.create = (req, res, next) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(404).json({
                error: errorHandler(err),
            })
        }
        return res.json({
            data
        })
    })

}

//get category info
exports.read = (req, res, next) => {
    return res.json(req.category);
}

//update category
exports.update = (req, res, next) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            })
        }
        return res.json(result);
    });
}

//delete category
exports.delete = (req, res, next) => {
    const category = req.category;

    category.remove((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            })
        }
        return res.json({
            message: "Category deleted Successfully"
        });
    });
}

//get all category
exports.readall = (req, res, next) => {
    Category.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            })
        }
        return res.json(result);
    })
}

//get category by id
exports.categoryByID = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            })
        }

        req.category = category;
        next();
    })
}