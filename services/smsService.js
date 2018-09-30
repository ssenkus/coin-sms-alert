const dotenv = require('dotenv');
const Twilio = require('twilio');
const SmsMessage = require('../models/smsMessage');

const config = dotenv.config().parsed;
const client = new Twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);


exports.sendSms = (bodyMessage, done) => {

    const smsMessage = new SmsMessage({
        to: config.TO_PHONE_NUMBER,
        from: config.FROM_PHONE_NUMBER,
        body: bodyMessage
    });

    client.messages.create(smsMessage, (err, message) => {
        if (err) return done(err);

        return done(null, message);
    });

};