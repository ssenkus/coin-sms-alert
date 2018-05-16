const _ = require('underscore');

const coinDataRepo = require('../dataAccess/repos/coinDataRepository');
const alarmRepo = require('../dataAccess/repos/alarmRepository');
const smsService = require('../services/smsService');

const jobName = 'Check Alarm Job';
let agendaInstance = null;

// Register our job with the agenda instance
exports.register = (agenda) => {
    agendaInstance = agenda;

    // Define what this job will do
    agendaInstance.define(jobName, () => {
        console.log(`'${jobName}' executed at ${new Date()}`);

        // Request coin data from the CoinMarketCap API
        coinDataRepo.getCoinData((err, coinsData) => {
            // Retrieve all alarms from our database
            alarmRepo.getAlarms((err, alarms) => {
                // Iterate through all alarms
                alarms.forEach((alarm) => {
                    let latestCoinData = _.findWhere(coinsData, {id: alarm.coinId});

                    // If the alarm's coin is found and the alarm is triggered...
                    if (latestCoinData && alarm.isTriggered(latestCoinData)) {
                        let message = `* ALARM * ${alarm.coinId}: $${latestCoinData.price_usd} is ${ alarm.thresholdDirection} threshold $${alarm.priceUsdThreshold}`;

                        // ...send a SMS message!
                        smsService.sendSms(message, () => {
                            console.log(message);
                        });
                    }
                });
            });
        });
    });
};

// Set schedule
exports.setSchedule = (timeInterval) => {
    agendaInstance.every(timeInterval, jobName);
};