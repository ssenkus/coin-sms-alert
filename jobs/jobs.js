const Agenda = require('agenda');
const mongoClientWrapper = require('../dataAccess/mongoClientWrapper');

const mongoConnectionString = `${process.env.MONGODB_CONNECTION_STRING}/${process.env.MONGODB_DATABASE}`
let agenda = null;

const testJobName = 'log date to console';


exports.start = () => {

    agenda = new Agenda({
        db: {
            address: mongoConnectionString
        },
        processEvery: 'one minute'
    });

    agenda.define(testJobName, (job, done)=> {
        console.log('Test job -> logged at ' + new Date());
        done();
    });

    agenda.on('ready', () => {
        deleteJobsCollection(() => {
            agenda.every('one minute', testJobName);

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
    mongoClientWrapper.deleteAgendaCollection(done);
}