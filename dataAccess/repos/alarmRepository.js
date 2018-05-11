const Alarm = require('../../models/alarm');
const db = require('../../dataAccess/mongoClientWrapper');

// Insert an alarm document record in MongoDB alarms collection
exports.createAlarm = (alarmData, done) => {
    const collection = db.alarms();

    collection.insertOne(alarmData, (err, alarm) => {
        done(err, alarm);
    });
};

// Retrieve all alarms from MongoDB alarm collection, convert all to Alarm model objects
exports.getAlarms = (done) => {
    const collection = db.alarms();

    collection.find({}).toArray((err, results) => {
        let alarms = results.map((result) => {
            return new Alarm(result)
        });
        
        done(err, alarms);
    });
};