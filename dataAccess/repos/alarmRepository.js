const Alarm = require('../../models/alarm');
const db = require('../../dataAccess/mongoClientWrapper');
const ObjectID = require('mongodb').ObjectID;



exports.createAlarm = (alarmData, done) => {
    const collection = db.alarms();

    collection.insertOne(alarmData, (err, result) => {
        done(err, alarmData);
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

exports.updateAlarm = (alarmId, alarmData, done) => {
    const collection = db.alarms();

    collection.updateOne({ _id: new ObjectID(alarmId) }, { $set: alarmData}, (err, res) => {
        done(err, res);
    });

};

exports.deleteAlarm = (alarmId, done) => {
    const collection = db.alarms();

    collection.deleteOne({ _id: new ObjectID(alarmId) }, (err, result) => {
        done(err, result);
    });
};