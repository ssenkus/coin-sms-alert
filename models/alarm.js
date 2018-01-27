const _ = require('underscore');

class Alarm {

    constructor(data) {
        _.extend(this, data);
    }

    isTriggered(latestCoinData) {
        let isAlarmTriggered = false;
        switch (this.thresholdDirection) {
            case 'under':
                isAlarmTriggered = latestCoinData.price_usd < this.priceUsdThreshold;
                break;
            case 'over':
            default:
                isAlarmTriggered = latestCoinData.price_usd > this.priceUsdThreshold;
                break;
        }
        return isAlarmTriggered;
    }
}

module.exports = Alarm;