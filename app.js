const express =  require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
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
   

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());


//routing
app.use('/api', userRouter);


//run
const port = process.env.PORT || 8000 ;
app.listen(port, ()=>{
    console.log("Server is Running on Port: "+port);
})