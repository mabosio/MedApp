module.exports = (app) => {
    const inmunization = require('../controllers/inmunizations.controller.js');

    // Create a new inmunization with patient id
    app.post('/inmunizations/:id', inmunization.create);

    // Retrieve all  inmunization from data base
    app.get('/inmunizations/', inmunization.findAll);

    // Retrieve all patient's inmunization  by patient ID
    app.get('/inmunizations/:id', inmunization.findAllPat);

    // Retrieve an inmunization  with patient Id and inmunization Id
    app.get('/inmunizations/:idp/:idi', inmunization.findOne);

     // Update an inmunization with with patient Id and inmunization Id
    app.put('/inmunizations/:idp/:idi', inmunization.update);

     // Delete an inmunization with patient Id and inmunization Id
     app.delete('/inmunizations/:idp/:idi', inmunization.delete)
};