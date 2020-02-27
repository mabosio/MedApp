
module.exports = (app) => {
    const medication = require('../controllers/medications.controller.js');

    // Create a new medication with patient id
    app.post('/medications/:id', medication.create);

    // Retrieve all  medication from data base
    app.get('/medications/', medication.findAll);

    // Retrieve all patient's medication  by patient ID
    app.get('/medications/:id', medication.findAllPat);

    // Retrieve a medication  with patient Id and medication Id
    app.get('/medications/:idp/:idi', medication.findOne);

    // Update a medication with with patient Id and medication Id
    app.put('/medications/:idp/:idi', medication.update);

    // Delete a medication with patient Id and medication Id
    app.delete('/medications/:idp/:idi', medication.delete)
};