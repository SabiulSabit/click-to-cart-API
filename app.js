const express =  require('express');
const mongoose = require('mongoose')
require('dotenv').config();

//app
const app = express();

// import all router
const userRouter = require('./routes/user')

//connect to db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( () =>{ 
    console.log("Connected To Database");
} )
   



//routing
app.use('/api', userRouter);


//run
const port = process.env.PORT || 8000 ;
app.listen(port, ()=>{
    console.log("Server is Running on Port: "+port);
})