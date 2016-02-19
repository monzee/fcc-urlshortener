'use strict';
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(`${__dirname}/public`));

// views is directory for all template files
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.get('/', (_, res) => {
    res.render('pages/usage');
});

app.get('/api/whoami', (req, res) => {
    let ipaddress = req.connection.remoteAddress.match(/:([^:]+)$/)[1] || req.connection.remoteAddress;
    let language = req.headers['accept-language'].split(',')[0];
    let software = req.headers['user-agent'].match(/\(([^)]+)\)/)[1] || req.headers['user-agent'];
    res.json({ipaddress, language, software});
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});
