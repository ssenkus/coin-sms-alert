const alarmRepo = require('../dataAccess/repos/alarmRepository');


exports.configure = (app) => {

    app.get('/api/alarm', getAlarms);
    app.post('/api/alarm', createAlarm);
    app.put('/api/alarm/:alarmId', updateAlarm);
    app.delete('/api/alarm/:alarmId', deleteAlarm);

};

function getAlarms(req, res, done) {

    alarmRepo.getAlarms((err, alarms) => {
        return res.json(alarms);
    });

}

function createAlarm(req, res, done) {
    const alarmData = req.body;

    alarmRepo.createAlarm(alarmData, (err, alarm) => {
        return res.json(alarm);
    });
}

function updateAlarm(req, res, done) {
    const alarmData = req.body;

    alarmRepo.updateAlarm(req.params.alarmId, alarmData, (err, result) => {
        return res.json(result);
    });
}

function deleteAlarm(req, res, done) {

    alarmRepo.deleteAlarm(req.params.alarmId, (err, result) => {
        return res.json(result);
    });

}