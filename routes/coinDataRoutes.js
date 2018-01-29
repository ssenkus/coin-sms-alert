const _ = require('underscore');

const coinDataRepo = require('../repos/coinDataRepository');
const Alarm = require('../models/alarm');

exports.configure = (app) => {

    app.get('/api/coins', getCoinData);

};

function getCoinData(req, res, done) {

    coinDataRepo.getCoinData((err, coinsData) => {

        let alarm = new Alarm({
            coinId: 'bitcoin',
            priceUsdThreshold: 10000.00,
            thresholdDirection: 'over'
        });

        let latestCoinData = _.findWhere(coinsData, {id: alarm.coinId});

        if (latestCoinData && alarm.isTriggered(latestCoinData)) {
            console.log(`* ALARM * ${alarm.coinId}: $${latestCoinData.price_usd} is ${ alarm.thresholdDirection} threshold $${alarm.priceUsdThreshold}`);
        }

        res.json(coinsData);
    });

}