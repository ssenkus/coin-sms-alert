const coinDataRepo = require('../dataAccess/repos/coinDataRepository');

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

        res.json(coinsData);

    });

}