const alarmRepo = require('../dataAccess/repos/alarmRepository');

// Alarm CRUD (CREATE - READ/RETRIEVE - UPDATE - DELETE) routes
exports.configure = (app) => {
    // RESTful routing
    app.post('/api/alarm', createAlarm);
    app.get('/api/alarm', getAlarms);

};

// Create an alarm and respond with JSON alarm object
function createAlarm(req, res, done) {
    const alarmData = req.body;

    alarmRepo.createAlarm(alarmData, (err, alarm) => {
        return res.json(alarm);
    });
}

// Retrieve all alarms and return a JSON array
function getAlarms(req, res, done) {

    alarmRepo.getAlarms((err, alarms) => {
        return res.json(alarms);
    });

}