const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.json({type: 'application/json'}));

// Requests to http://localhost:3000/ will respond with a JSON object
app.get('/', (req, res) => {
    res.json({success: true});
});

// Requests to http://localhost:3000/api/coins will trigger a request to CoinMarketCap API,
// respond with a JSON object with coin prices, and log a message to the console.
app.get('/api/coins', (req, res) => {
    request.get('https://api.coinmarketcap.com/v1/ticker/', (err, response, body) => {
        let coinData = JSON.parse(body);

        console.log(coinData);
        res.json(coinData);
    });
});

// Start listening on port 3000 to start receiving requests
app.listen(3000, () => {
    console.log('Coin Alert app listening on port 3000!')
});
