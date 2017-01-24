var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var client = require('./keys/client_id.json').web;
console.log(client);


passport.use(
    new GoogleStrategy({
        clientID: client.client_id,
        clientSecret: client.client_secret,
        callbackURL: client.redirect_uris[0]
    }, 
    function(accessToken, refreshToken, profile, cb) {
        console.log(arguments);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            console.log(user);
            return cb(err, user);
        });
    }
));
