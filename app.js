const express =  require('express');
require('dotenv').config();

const app = express();

app.get('/', (req,res,next)=>{
    res.send("hello world")
})

const port = process.env.PORT || 8000 ;
app.listen(port)