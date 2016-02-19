'use strict';
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(`${__dirname}/public`));

// views is directory for all template files
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.get('/', (_, res) => {
  res.render('pages/help');
});

const MONTHS = `January February March April May June July August 
                September October November December`.split(/\s+/);

app.get('/:date', (req, res) => {
    let d = req.params['date'];
    let date = new Date(isNaN(d) ? d : +d);
    let unix = null, natural = null;
    if (date != 'Invalid Date') {
        unix = +date;
        natural = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
    res.json({unix, natural});
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
