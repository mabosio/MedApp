module.exports = (app) => {
    const demographic = require('../controllers/demographics.controller.js');

    // Create a new patient
    app.post('/patients', demographic.create);

    // Retrieve all patients
    app.get('/patients', demographic.findAll);

    // Retrieve a single  patient (only main and embedded data)
    app.get('/patients/:id/ppaldata', demographic.findOnePpal);

    // Retrieve a single  complete patient
    app.get('/patients/:id/compltdata', demographic.findOne);

    // Update a patient with id
    app.put('/patients/:id', demographic.update);

    // Modify a patient´s allergy by patient id and allergy id
    app.put('/patients/:id/modifyallergy/:ida', demographic.modifyAll);

    // Delete a patient´s allergy by patient id and allergy id
    app.delete('/patients/:id/deleteallergy/:ida', demographic.deleteAll);

    // Delete a patient with id
    app.delete('/patients/:id', demographic.delete);
};