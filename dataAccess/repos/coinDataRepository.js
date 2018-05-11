const request = require('request');

// Make a GET request to CoinMarketCap's API to retrieve latest cryptocoin prices
exports.getCoinData = (done) => {

    request.get('https://api.coinmarketcap.com/v1/ticker/', (err, response, body) => {

        let coinsData = JSON.parse(body);

        done(err, coinsData);
    });

};