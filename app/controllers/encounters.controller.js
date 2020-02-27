        const Encounter = require('../models/encounter.js');
        const Demographic = require('../models/demographics.js');
        const util = require('./utils.js');

        // Create  a new encounter by patient ID
        exports.create = async (req, res) => {
            // Validate request
            if (!req.body.enctype || !req.body.encday) {
                return res.status(400).send({
                    message: "Encounter type and date are mandatory"
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
                // Create a new encounter
                const newencount = new Encounter();
                util.setObVal( newencount, req.body);
                newencount.save()
                    .then(data => {
                        demographic.encounters.push(data._id);
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
                        message: err.message || "Some error occurred while creating the encounter."
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

        // Retrieve all  encounter from data base
        exports.findAll = async (req, res) => {
            try {
                let encounter = await Encounter.find();
                res.send(encounter);
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving encounters."
                });
            }

        };

        // Retrieve and return all patient´s encounters by patient ID.
        exports.findAllPat = async (req, res) => {
            try {
                // console.log(req.params.id);
                let patient = await Demographic.findById(req.params.id);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                let encounter = await Encounter.find({_id : {$in: patient.encounters}});
                res.send(encounter);
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving encounter."
                });
            }
        };

        // Find a single patient's encounter  by  patient ID and encounter ID
        exports.findOne = async (req, res) => {
            console.log("patient"+req.params.idp);
            console.log("encounter"+req.params.idi);
            try {
                let patient = await Demographic.findById(req.params.idp);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                let encounter = await Encounter.findById(req.params.idi);
                res.send(encounter);
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving encounter."
                });
            }
        };


        //Update a patient's encounter by patient ID and encounter ID
        exports.update = async (req, res) => {
            try {
                let patient = await Demographic.findById(req.params.idp);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                let encounter = await Encounter.findById(req.params.idi);
                util.setObVal(encounter, req.body);
                encounter.save().then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the patient."
                    });
                });
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving encounter."
                });
            }

        };

        //Delete a patient's encounter by patient ID and encounter ID
        exports.delete = async (req, res) => {
            try {
                let patient = await Demographic.findById(req.params.idp);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                const index =patient.encounters.indexOf(req.params.idi);
                if (index > -1) {
                    patient.encounters.splice(index, 1);
                }
                let encounter = await Encounter.findByIdAndRemove(req.params.idi);
                if (!encounter) {
                    return res.status(404).send({
                        message: "encounter not found "
                    });
                }
                patient.save().then(data => {
                    res.send({message: "encounter deleted successfully!"})
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the patient."
                    });
                });

            } catch (err) {
                res.status(500).send({
                    message: "Error deleting encounter by id ."
                });
            }

        };

