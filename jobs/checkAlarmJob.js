const _ = require('underscore');

const coinDataRepo = require('../dataAccess/repos/coinDataRepository');
const alarmRepo = require('../dataAccess/repos/alarmRepository');
const smsService = require('../services/smsService');

const jobName = 'check alarm job';
let agendaInstance = null;

exports.define = (agenda) => {

    agendaInstance = agenda;

    agenda.define(jobName, () => {
        console.log(`'${jobName}' executed at ${new Date()}`);

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
            });
        });
    });
};

exports.setSchedule = (timeInterval) => {
    agendaInstance.every(timeInterval, jobName);
};