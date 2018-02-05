const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const mongoClientWrapper = require('./dataAccess/mongoClientWrapper');
const jobs = require('./jobs/jobs');
const app = express();


app.use(bodyParser.json({type: 'application/json'}));

app.listen(3000, () => {
    console.log('Coin Alert app listening on port 3000!');

    mongoClientWrapper.initialize(() => {

        routes.configure(app);
        jobs.start();
    });

    process.on('SIGINT', shutDown);
    process.on('SIGTERM',shutDown);
});

function shutDown() {
    console.log('\nShutting down!');

    jobs.stop(() => {

        mongoClientWrapper.dispose(() => {
            process.exit(0);
        });

    });

}

