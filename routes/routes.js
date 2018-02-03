const coinDataRoutes = require('./coinDataRoutes');
const alarmRoutes = require('./alarmRoutes');
const smsRoutes = require('./smsRoutes');

exports.configure = (app) => {

    app.get('/', (req, res) => {
        res.json({success: true});
    });

    coinDataRoutes.configure(app);
    alarmRoutes.configure(app);
    smsRoutes.configure(app);

};