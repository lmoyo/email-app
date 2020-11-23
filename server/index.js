//https://polar-escarpment-92250.herokuapp.com/

const express = require('express');
const mongoose = require('mongoose')
const passportConfig = require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);


const app = express();

authRoutes(app);


const PORT = process.env.PORT || 5000; //injected from heroku
app.listen(PORT);
