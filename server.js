const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const _ = require('underscore')
const Alarm = require('./models/alarm');

const app = express();


app.use(bodyParser.json({type: 'application/json'}));

app.get('/', (req, res) => {
    res.json({success: true});
});

app.get('/api/coins', (req, res) => {
    console.log('REQ', req);
    request.get('https://api.coinmarketcap.com/v1/ticker/', (err, response, body) => {
        let coinsData = JSON.parse(body);
        let alarm = new Alarm({
            coinId: 'bitcoin',
            priceUsdThreshold: 1000.00,
            thresholdDirection: 'over'
        });

        let latestCoinData = _.findWhere(coinsData, { id: alarm.coinId});

        if (latestCoinData && alarm.isTriggered(latestCoinData)) {
            console.log(`* ALARM * ${alarm.coinId}: $${latestCoinData.price_usd} is ${ alarm.thresholdDirection} threshold $${alarm.priceUsdThreshold}`);
        }

        res.json(coinsData);
    });
});

app.listen(3000, () => {
    console.log('Coin Alert app listening on port 3000!')
});

