const _ = require('underscore');

const coinDataRepo = require('../dataAccess/repos/coinDataRepository');
const alarmRepo = require('../dataAccess/repos/alarmRepository');
const smsService = require('../services/smsService');

// Coin routes
exports.configure = (app) => {
    // RESTful coin routes
    app.get('/api/coins', getCoinData);

};

// Get latest coin data, get all created alarms,
// determine if any alarms have thresholds that have been crossed,
// return coin data in JSON format
function getCoinData(req, res, done) {

    coinDataRepo.getCoinData((err, coinsData) => {

        alarmRepo.getAlarms((err, alarms) => {

            alarms.forEach((alarm) => {

                let latestCoinData = _.findWhere(coinsData, {id: alarm.coinId});

                if (latestCoinData && alarm.isTriggered(latestCoinData)) {

                    let message = `* ALARM * ${alarm.coinId}: $${latestCoinData.price_usd} is ${ alarm.thresholdDirection} threshold $${alarm.priceUsdThreshold}`;

                    smsService.sendSms(message, () => {
                        console.log(message);
                    });

                }

            });

            res.json(coinsData);
        });

    });

}