const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const _ = require('underscore');
// Import our new Alarm model
const Alarm = require('./models/alarm');

const app = express();


app.use(bodyParser.json({type: 'application/json'}));

// Requests to http://localhost:3000/ will respond with a JSON object
app.get('/', (req, res) => {
    res.json({success: true});
});

// Requests to http://localhost:3000/api/coins will trigger a request to CoinMarketCap API,
// respond with a JSON object with coin prices, and log a message to the console if Bitcoin is above $1000.
app.get('/api/coins', (req, res) => {
    console.log('REQ', req);
    request.get('https://api.coinmarketcap.com/v1/ticker/', (err, response, body) => {
        let coinsData = JSON.parse(body);

        // Hardcode an Alarm with a low value to ensure alarm will trigger
        let alarm = new Alarm({
            coinId: 'bitcoin',
            priceUsdThreshold: 1000.00,
            thresholdDirection: 'over'
        });

        // Find Bitcoin’s data object inside response collection
        let latestCoinData = _.findWhere(coinsData, { id: alarm.coinId});

        //  Log the alarm data to the console if the threshold is crossed
        if (latestCoinData && alarm.isTriggered(latestCoinData)) {
            console.log(`* ALARM * ${alarm.coinId}: $${latestCoinData.price_usd} is ${ alarm.thresholdDirection} threshold $${alarm.priceUsdThreshold}`);
        }

        // Return a JSON object of the CoinMarketCap API response
        res.json(coinsData);
    });
});

// Start listening on port 3000 to start receiving requests
app.listen(3000, () => {
    console.log('Coin Alert app listening on port 3000!')
});

