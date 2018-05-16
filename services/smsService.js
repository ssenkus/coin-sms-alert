const dotenv = require('dotenv');
const Twilio = require('twilio');

// Use the values defined in .env to set up our Twilio API client
const config = dotenv.config().parsed;
const client = new Twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

// Send SMS containing alarm message using config values
exports.sendSms = (bodyMessage, done) => {

    // create a message object with environment values and message
    let message = {
        to: config.TO_PHONE_NUMBER,
        from: config.FROM_PHONE_NUMBER,
        body: bodyMessage
    };

    // send message, the return the response
    client.messages.create(message, (err, messageResponse) => {
        if (err) return done(err);

        return done(null, messageResponse);
    });

};