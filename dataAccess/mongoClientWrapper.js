const mongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

let config = dotenv.config().parsed;
let dbConnectionString = config.MONGODB_CONNECTION_STRING;
let dbName = config.MONGODB_DATABASE;

let db = null;
let connectedClient = null;

// Connect to our MongoDB database and make database client available for use
exports.initialize = (done) => {
    if (db) return process.nextTick(done);

    console.log('Connecting to mongo database: ' + dbConnectionString);

    mongoClient.connect(dbConnectionString, (err, client) => {
        if (err) {
            console.log('Couldn\'t connect to mongo database', err);
            return done(err);
        }

        db = client.db(dbName);
        connectedClient = client;
        return done();
    });
};

// Close our MongoDB connection for shutdown
exports.dispose = (done) => {
    if (db) {
        console.log('Closing connection to mongo database: ' + dbConnectionString);
        db = null;

        connectedClient.close((err, result) => {
            if (err) {
                console.log('Error closing connection to mongo database', err);
                return done(err);
            }
            console.log('Database connection closed');
            return done();
        });
    } else {
        return process.nextTick(done);
    }
};

exports.getDb = () => {
    return db;
};

exports.alarms = () => {
    return db.collection('alarms');
};

exports.agendaJobs = () => {
    return db.collection('agendaJobs');
};