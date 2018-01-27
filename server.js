const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();


app.use(bodyParser.json({type: 'application/json'}));

app.get('/', (req, res) => {
    res.json({success: true});
});

app.get('/api/coins', (req, res) => {
    request.get('https://api.coinmarketcap.com/v1/ticker/', (err, response, body) => {
        let coinData = JSON.parse(body);

        console.log(coinData);
        res.json(coinData);
    });
});

app.listen(3000, () => {
    console.log('Coin Alert app listening on port 3000!')
});

