const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();

//gateway setup
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

//generate the token
exports.generateToken = (req, res, next) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            res.send(response);
        }
    })
}

//process the payment
exports.postProcessPayment = (req, res, next) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amoutFromTheClient = req.body.amount;

    let newTransaction = gateway.transaction.sale({
        amount: amoutFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true,
        }
    }, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.json(result);
        }
    })
}