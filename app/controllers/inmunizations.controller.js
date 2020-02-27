        const Inmunization = require('../models/inmunization.js');
        const Demographic = require('../models/demographics.js');
        const util = require('./utils.js');

        // Create  a new inmunization by patient ID
        exports.create = async (req, res) => {
            // Validate request
            if (!req.body.inmname || !req.body.inmday) {
                return res.status(400).send({
                    message: "Inmunization name and date are  mandatory"
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
                // Create a new inmunization
                const newinmun = new Inmunization();
                util.setObVal( newinmun, req.body);
                newinmun.save()
                    .then(data => {
                        demographic.inmunizations.push(data._id);
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
                        message: err.message || "Some error occurred while creating the inmunization."
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

        // Retrieve all  inmunization from data base
        exports.findAll = async (req, res) => {
            try {
                let inmunization = await Inmunization.find();
                res.send(inmunization);
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving inmunizations."
                });
            }

        };

        // Retrieve and return all patient´s inmunizations by patient ID.
        exports.findAllPat = async (req, res) => {
            try {
                let patient = await Demographic.findById(req.params.id);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                let inmunization = await Inmunization.find({_id : {$in: patient.inmunizations}});
                res.send(inmunization);
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving inmunization."
                });
            }
         };

        // Find a single patient's inmunization  by  patient ID and inmunization ID
        exports.findOne = async (req, res) => {
             try {
                let patient = await Demographic.findById(req.params.idp);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
               }
                let inmunization = await Inmunization.findById(req.params.idi);
                res.send(inmunization);
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving inmunization."
                });
            }
        };


        //Update a patient's inmunization by patient ID and inmunization ID
        exports.update = async (req, res) => {
            try {
                let patient = await Demographic.findById(req.params.idp);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                let inmunization = await Inmunization.findById(req.params.idi);
                util.setObVal(inmunization, req.body);
                inmunization.save().then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the patient."
                    });
                });
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving inmunization."
                });
            }

        };

        //Delete a patient's inmunization by patient ID and inmunization ID
        exports.delete = async (req, res) => {
            try {
                let patient = await Demographic.findById(req.params.idp);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                const index =patient.inmunizations.indexOf(req.params.idi);
                if (index > -1) {
                    patient.inmunizations.splice(index, 1);
                }
                let inmunization = await Inmunization.findByIdAndRemove(req.params.idi);
                if (!inmunization) {
                    return res.status(404).send({
                        message: "inmunization not found "
                    });
                   }
                 patient.save().then(data => {
                     res.send({message: "inmunization deleted successfully!"})
                 }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the patient."
                    });
                });

            } catch (err) {
                res.status(500).send({
                    message: "Error deleting inmunization by id ."
                });
            }

        };

