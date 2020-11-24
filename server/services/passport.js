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
		callbackURL: '/auth/google/callback'
	},
	(accessToken, refreshToken, profile, done) => {
		
		//look through users collection to see if google id already exists
		User.findOne({ googleId: profile.id })
		.then((existingUser) => {
			if(existingUser) {
					// profile id record already exists

			done(null, existingUser); //first param error obj, null since success
			} else {
					//create user new model instance 
				new User({
					googleId: profile.id
				}).save()
				.then(user => done(null, user)); //creates another model instance representing same instance, always use second one
			}
		}) 
		

		
		// console.log('accessToken: ', accessToken);
		// console.log('refresh token: ', refreshToken);
		// console.log('profile: ', profile);
	})
);