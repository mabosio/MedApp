
module.exports = (app) => {
    const careplan = require('../controllers/careplans.controller.js');

    // Create a new care plan with patient id
    app.post('/careplans/:id', careplan.create);

    // Retrieve all  care plan from data base
    app.get('/careplans/', careplan.findAll);

    // Retrieve all patient's care plan  by patient ID
    app.get('/careplans/:id', careplan.findAllPat);

    // Retrieve an care plan  with patient Id and care plan Id
    app.get('/careplans/:idp/:idi', careplan.findOne);

    // Update an care plan with with patient Id and care plan Id
    app.put('/careplans/:idp/:idi', careplan.update);

    // Delete an care plan with patient Id and inmunization Id
    app.delete('/careplans/:idp/:idi', careplan.delete)
};