const smsService = require('../services/smsService');

// SMS-related routes
exports.configure = (app) => {
    // Test route to ensure API successfully sends a SMS alarm to our phone
    app.get('/api/sms/test', sendSmsTest);

};

// Send an SMS test message
function sendSmsTest(req, res, done) {

    smsService.sendSms('This is a test message from our Node.js App!', () => {
        console.log('Successfully sent a SMS message');

        res.json({
            success: true
        });
    })

}