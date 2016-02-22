'use strict';
const urlValidator = require('valid-url');
const express = require('express');
const app = express();

const DATABASE = [];  // don't hate. this is a toy.

function baseUrl(req) {
    return `${req.protocol}://${req.get('host')}`;
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(`${__dirname}/public`));

// views is directory for all template files
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let path = req.url.replace(/\/*$/, '');
    res.render('pages/usage', {baseUrl: baseUrl(req) + path});
});

app.get('/new/*', (req, res) => {
    let fullUrl = req.params[0];
    if (req.query.allow || urlValidator.isWebUri(fullUrl)) {
        let id = DATABASE.length;
        DATABASE.push(fullUrl);
        res.json({original_url: fullUrl, short_url: `${baseUrl(req)}/${id}`});
    } else {
        res.status(500).json({error: "Invalid URL"});
    }
});

app.get('/:id(\\d+)', (req, res) => {
    let id = req.params.id;
    if (id in DATABASE) {
        res.redirect(DATABASE[id]);
    } else {
        res.status(404).json({error: "Unregistered short URL"});
    }
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});
