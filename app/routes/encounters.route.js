

module.exports = (app) => {
    const encounter = require('../controllers/encounters.controller.js');

    // Create a new encounter with patient id
    app.post('/encounters/:id', encounter.create);

    // Retrieve all  encounters from data base
    app.get('/encounters/', encounter.findAll);

    // Retrieve all patient's encounter  by patient ID
    app.get('/encounters/:id', encounter.findAllPat);

    // Retrieve an encounter  with patient Id and encounter Id
    app.get('/encounters/:idp/:idi', encounter.findOne);

    // Update an encounter with with patient Id and encounter Id
    app.put('/encounters/:idp/:idi', encounter.update);

    // Delete an encounter with patient Id and encounter Id
    app.delete('/encounters/:idp/:idi', encounter.delete)
};