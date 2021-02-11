const express = require(`express`);
const bodyParser = require("body-parser");
const port = process.env.port || 5000;
const googleApi = require("./routes/google");
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');
const path = require('path');

// Create a new express app instance
const app = express();

// Configure middlewares to express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Generating access token and refresh token, need to export it to diffrent module.
(async () => {
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, './oauth2.keys.json'),
        scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    });
    
    /**
     * This is one of the many ways you can configure googleapis to use authentication credentials.
     * In this method, we're setting a global reference for all APIs.
     * Any other API you use here, like google.drive('v3'), will now use this auth client.
     * You can also override the auth client at the service and method call levels.
     */
    google.options({auth});
})();


// Configure routes
app.use('/api/v1/google', googleApi);

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});