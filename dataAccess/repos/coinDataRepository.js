const request = require('request');

exports.getCoinData = (done) => {

    request.get('https://api.coinmarketcap.com/v1/ticker/', (err, response, body) => {

        let coinsData = JSON.parse(body);

        done(err, coinsData);
    });

};