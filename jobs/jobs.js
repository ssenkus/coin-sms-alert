const Agenda = require('agenda');

const db = require('../dataAccess/mongoClientWrapper');
const checkAlarmJob = require('./checkAlarmJob');

const mongoConnectionString = `${process.env.MONGODB_CONNECTION_STRING}/${process.env.MONGODB_DATABASE}`;

let agenda = null;


exports.start = () => {
    agenda = new Agenda({
        db: {
            address: mongoConnectionString
        },
        processEvery: 'one minute'
    });

    agenda.on('ready', () => {
        deleteJobsCollection(() => {
            checkAlarmJob.define(agenda);
            checkAlarmJob.setSchedule('one minute');

            agenda.start(() => {
                console.log('Started jobs');
            });

        });
    });

    agenda.on('error', (err) => {
        console.log('Error with Agenda!', err);
    });
};

exports.stop = (done) => {
    agenda.stop(() => {
        console.log('Successfully shut down jobs');
        done();
    });
};


function deleteJobsCollection(done) {
    db.agendaJobs().drop(done);
}