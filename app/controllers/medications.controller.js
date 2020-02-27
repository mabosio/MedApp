    const Medication = require('../models/medication.js');
    const Demographic = require('../models/demographics.js');
    const util = require('./utils.js');

    // Create  a new medication by patient ID
    exports.create = async (req, res) => {
        // Validate request
        if (!req.body.medtype || !req.body.medday) {
            return res.status(400).send({
                message: "Medication type and date are mandatory"
            });
        }
        // console.log(id);
        try {
            let demographic = await Demographic.findById(req.params.id);
            if (!demographic) {
                return res.status(404).send({
                    message: "Patient not found "
                });
            }
            // Create a new medication
            const newmed = new Medication();
            util.setObVal( newmed, req.body);
            newmed.save()
                .then(data => {
                    demographic.medications.push(data._id);
                    demographic.save()
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while updating the patient."
                            });
                        });

                }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the medication."
                });
            });
        } catch (err) {
            // console.log(demographic);
            // console.log(demographic.id);
            res.status(500).send({
                message: "Error retrieving patient by id ."
            });
        }
    };

    // Retrieve all  medication from data base
    exports.findAll = async (req, res) => {
        try {
            let medication = await Medication.find();
            res.send(medication);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving medications."
            });
        }

    };

    // Retrieve and return all patient´s medications by patient ID.
    exports.findAllPat = async (req, res) => {
        try {
            let patient = await Demographic.findById(req.params.id);
            if (!patient){
                return res.status(404).send({
                    message: "Patient not found "
                });
            }
            let medication = await Medication.find({_id : {$in: patient.medications}});
            res.send(medication);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving medication."
            });
        }
    };

    // Find a single patient's medication  by  patient ID and medication ID
    exports.findOne = async (req, res) => {
        try {
            let patient = await Demographic.findById(req.params.idp);
            if (!patient){
                return res.status(404).send({
                    message: "Patient not found "
                });
            }
            let medication = await Medication.findById(req.params.idi);
            res.send(medication);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving medication."
            });
        }
    };


    //Update a patient's medication by patient ID and medication ID
    exports.update = async (req, res) => {
        try {
            let patient = await Demographic.findById(req.params.idp);
            if (!patient){
                return res.status(404).send({
                    message: "Patient not found "
                });
            }
            let medication = await Medication.findById(req.params.idi);
            util.setObVal(medication, req.body);
            medication.save().then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating the patient."
                });
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving medication."
            });
        }

    };

    //Delete a patient's medication by patient ID and medication ID
    exports.delete = async (req, res) => {
        try {
            let patient = await Demographic.findById(req.params.idp);
            if (!patient){
                return res.status(404).send({
                    message: "Patient not found "
                });
            }
            const index =patient.medications.indexOf(req.params.idi);
            if (index > -1) {
                patient.medications.splice(index, 1);
            }
            let medication = await Medication.findByIdAndRemove(req.params.idi);
            if (!medication) {
                return res.status(404).send({
                    message: "medication not found "
                });
            }
            patient.save().then(data => {
                res.send({message: "medication deleted successfully!"})
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating the patient."
                });
            });

        } catch (err) {
            res.status(500).send({
                message: "Error deleting medication by id ."
            });
        }

    };
