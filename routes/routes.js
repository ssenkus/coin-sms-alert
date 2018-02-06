const express = require('express');

const coinDataRoutes = require('./coinDataRoutes');
const alarmRoutes = require('./alarmRoutes');
const smsRoutes = require('./smsRoutes');

exports.configure = (app) => {

    app.use('/', express.static(`${__dirname}/../dashboard/build`));

    coinDataRoutes.configure(app);
    alarmRoutes.configure(app);
    smsRoutes.configure(app);

};