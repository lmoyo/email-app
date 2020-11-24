//https://polar-escarpment-92250.herokuapp.com/

const express = require('express');
const mongoose = require('mongoose')
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User')
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//tell express to make use of cookies
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        keys: [keys.cookieKey] //can provide multiple keys and it will pick random
    })
);

//tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);


const PORT = process.env.PORT || 5000; //injected from heroku
app.listen(PORT);

//test deployment
