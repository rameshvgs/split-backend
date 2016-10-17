module.exports = function (app, passport) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // frontend routes =========================================================
    // route to handle all angular requests
    app.post('/logout', function (req, res) {
        req.logout();
        res.send(200);
    });
    app.get('/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                res.json({message: 'failed'});
            } else {
                res.json(user);
            }

        })(req, res, next);
    });
};