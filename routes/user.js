const express = require('express');
const router = express.Router();


router.route('/')
    .get((req,res,next)=>{
        console.log("From Router");
    })

module.exports = router;    