const coinDataRoutes = require('./coinDataRoutes');
const alarmRoutes = require('./alarmRoutes');

exports.configure = (app) => {

    app.get('/', (req, res) => {
        res.json({success: true});
    });

    coinDataRoutes.configure(app);
    alarmRoutes.configure(app);

};