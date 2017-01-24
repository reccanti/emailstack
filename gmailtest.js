var client = require('./keys/client_id.json');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

function authorize(client) {
    var secret = client.web.client_secret;
    var id = client.web.client_id;
    var redirect = client.web.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(secret, id, redirect);
    console.log(oauth2Client);
}

authorize(client);
