const express = require("express");
const https = require('https');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'UI')));
app.use(express.static(path.join(__dirname, '.well-known')));
app.use(compression());

app.listen(port, () => {
    console.log(`App started at ${port}`);
})

app.all('/.well-known/pki-validation/', (req, res) => {
    res.sendFile(path.join(__dirname, ".well-known", "pki-validation", "92462F2BCF76C55CE5F9DA7B92646C34.txt"))
});

app.all('/.well-known/pki-validation/92462F2BCF76C55CE5F9DA7B92646C34.txt', (req, res) => {
    res.sendFile(path.join(__dirname, ".well-known", "pki-validation", "92462F2BCF76C55CE5F9DA7B92646C34.txt"))
})

// https.createServer({
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem'),
//     passphrase: 'YOUR PASSPHRASE HERE'
// }, app)
// .listen(port);