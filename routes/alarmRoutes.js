const alarmRepo = require('../repos/alarmRepository');


exports.configure = (app) => {

    app.post('/api/alarm', createAlarm);
    app.get('/api/alarm', getAlarms);

};

function createAlarm(req, res, done) {
    const alarmData = req.body;

    alarmRepo.createAlarm(alarmData, (err, alarm) => {
        return res.json(alarm);
    });
}

function getAlarms(req, res, done) {

    alarmRepo.getAlarms((err, alarms) => {
        return res.json(alarms);
    });

}