const passport = require('passport');
const keys = require('../config/keys');
const googleStrategy = require('passport-google-oauth20').Strategy;

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