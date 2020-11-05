const passport = require('passport');

module.exports = (app) => {

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'] //scope specifies what access we want
        })
    );


    app.get('/auth/google/callback', passport.authenticate('google'));

};