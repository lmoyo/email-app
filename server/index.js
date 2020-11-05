//https://polar-escarpment-92250.herokuapp.com/

const express = require('express');
const passportConfig = require('./services/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

authRoutes(app);



const PORT = process.env.PORT || 5000; //injected from heroku
app.listen(PORT);
