const express =  require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expreesValidator = require('express-validator');
require('dotenv').config();

//app
const app = express();

// import all router
const authRouter = require('./routes/auth')

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
app.use(expreesValidator());


//routing
app.use('/api', authRouter);


//run
const port = process.env.PORT || 8000 ;
app.listen(port, ()=>{
    console.log("Server is Running on Port: "+port);
})