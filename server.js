const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "App for simple medical institution"});
});
require('./app/routes/demographic.routes.js')(app);
require('./app/routes/inmunizations.routes.js')(app);
require('./app/routes/medications.route.js')(app);
require('./app/routes/encounters.route.js')(app);
require('./app/routes/careplans.routes.js')(app);

// listen for requests
const port = process.env.PORT || 3000;
app.listen(port);


// app.listen(3000, () => {
//     console.log("Server is listening on http://localhost:3000");
// });