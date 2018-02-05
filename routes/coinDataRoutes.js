const coinDataRepo = require('../dataAccess/repos/coinDataRepository');

exports.configure = (app) => {

    app.get('/api/coins', getCoinData);

};


function getCoinData(req, res, done) {

    coinDataRepo.getCoinData((err, coinsData) => {

        res.json(coinsData);

    });

}