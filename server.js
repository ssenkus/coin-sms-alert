const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const mongoClientWrapper = require('./dataAccess/mongoClientWrapper');
const app = express();

// Use body-parser as middleware so that we have JSON data available on Request objects
app.use(bodyParser.json({type: 'application/json'}));

// Start listening on port 3000 to start receiving requests
app.listen(3000, () => {
    console.log('Coin Alert app listening on port 3000!');

    // Initialize our MongoDB client
    mongoClientWrapper.initialize(() => {
        // Set up routes
        routes.configure(app);
    });

});
