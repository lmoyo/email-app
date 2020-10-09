//https://polar-escarpment-92250.herokuapp.com/

const express = require('express');
const passport = require('passport');

const keys = require('./config/keys');
const googleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(
	new googleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},
	(accessToken, refreshToken, profile, done) => {
		console.log('accessToken: ', accessToken);
		console.log('refresh token: ', refreshToken);
		console.log('profile: ', profile);
	})
);

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'] //scope specifies what access we want
	})
);


app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000; //injected from heroku
app.listen(PORT);
