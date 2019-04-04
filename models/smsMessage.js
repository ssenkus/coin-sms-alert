class SmsMessage {

    constructor(params) {
        this.to = params.to;
        this.from = params.from;
        this.body = params.body;
    }

}

module.exports = SmsMessage;