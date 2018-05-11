const coinDataRoutes = require('./coinDataRoutes');
const alarmRoutes = require('./alarmRoutes');
const smsRoutes = require('./smsRoutes');

// Configure all routes here
exports.configure = (app) => {

    // Test URL
    app.get('/', (req, res) => {
        res.json({success: true});
    });

    // Add routes to the express app object
    coinDataRoutes.configure(app);
    alarmRoutes.configure(app);
    smsRoutes.configure(app);

};