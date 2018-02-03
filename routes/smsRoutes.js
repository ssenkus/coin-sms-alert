const smsService = require('../services/smsService');


exports.configure = (app) => {

    app.get('/api/sms/test', sendSmsTest);

};

function sendSmsTest(req, res, done) {

    smsService.sendSms('This is a test message from our Node.js App!', () => {
        console.log('Successfully sent a SMS message');

        res.json({
            success: true
        });
    })

}