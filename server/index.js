//https://polar-escarpment-92250.herokuapp.com/

const express = require('express');
const mongoose = require('mongoose')
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User')
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(express.json());

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
billingRoutes(app);

//only run on heroku
if(process.env.NODE_ENV === 'production'){
    //express loads production assets
    app.use(express.static('client/build'));

    //if route is not recognised, load html
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} 

const PORT = process.env.PORT || 5000; //injected from heroku
app.listen(PORT);


