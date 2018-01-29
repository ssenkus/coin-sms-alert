const Alarm = require('../models/alarm');
const db = require('../dataAccess/mongoClientWrapper');


exports.createAlarm = (alarmData, done) => {
    const collection = db.alarms();

    collection.insertOne(alarmData, (err, alarm) => {
        done(err, alarm);
    });
};

exports.getAlarms = (done) => {
    const collection = db.alarms();

    collection.find({}).toArray((err, results) => {
        let alarms = results.map((result) => {
            return new Alarm(result)
        });
        
        done(err, alarms);
    });
};