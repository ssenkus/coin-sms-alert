const express = require('express');
const app = express();

// Requests to http://localhost:3000/ will respond with a JSON object
app.get('/', (req, res) => {
    res.json({success: true});
});

// Start listening on port 3000 to start receiving requests
app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});
