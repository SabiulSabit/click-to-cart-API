const express =  require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expreesValidator = require('express-validator');
const  cors = require('cors');
require('dotenv').config();

//app
const app = express();

// import all router
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const braintreeRouter = require('./routes/braintree')
const orderRouter = require('./routes/order')

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
app.use(cors());


//routing
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api',productRouter);
app.use('/api',braintreeRouter);
app.use('/api',orderRouter);


//run
const port = process.env.PORT || 8000 ;
app.listen(port, ()=>{
    console.log("Server is Running on Port: "+port);
})