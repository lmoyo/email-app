const passport = require('passport');

module.exports = (app) => {

    //handle oauth process
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'] //scope specifies what access we want
        })
    );


    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    //handle api requests
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};