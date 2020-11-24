const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose')
const googleStrategy = require('passport-google-oauth20').Strategy;


const User = mongoose.model('users');

//user is mongoose model instance
passport.serializeUser((user, done) => {
	//id from db
	done(null, user.id);
})

passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => {
		done(null, user);
	});
});



passport.use(
	new googleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true
	},
	async (accessToken, refreshToken, profile, done) => {
		
		//look through users collection to see if google id already exists
		const existingUser = await User.findOne({ googleId: profile.id })
		
		// profile id record already exists
		if(existingUser) {

			return done(null, existingUser); //first param error obj, null since success
		}

		//create user new model instance 
		const user = await new User({
			googleId: profile.id
		}) .save();
		done(null, user);
		
	})
);