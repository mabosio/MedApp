        const Careplan = require('../models/careplan.js');
        const Demographic = require('../models/demographics.js');
        const util = require('./utils.js');

        // Create  a new care plan by patient ID
        exports.create = async (req, res) => {
            // Validate request
            if (!req.body.activity || !req.body.actday ||!req.body.actinstruc) {
                return res.status(400).send({
                    message: "Care plan activity, date and instructions are mandatory"
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
                // Create a new careplan
                const newcarep = new Careplan();
                util.setObVal( newcarep, req.body);
                newcarep.save()
                    .then(data => {
                        demographic.careplans.push(data._id);
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
                        message: err.message || "Some error occurred while creating the care plan."
                    });
                });
            } catch (err) {
                 res.status(500).send({
                    message: err.message || "Error retrieving patient by id ."
                });
            }
        };

        // Retrieve all  care plans from data base
        exports.findAll = async (req, res) => {
            try {
                let careplan = await Careplan.find();
                res.send(careplan);
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving care plans."
                });
            }

        };

        // Retrieve and return all patient´s care plans by patient ID.
        exports.findAllPat = async (req, res) => {
            try {
                // console.log(req.params.id);
                let patient = await Demographic.findById(req.params.id);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                let careplan = await Careplan.find({_id : {$in: patient.careplans}});
                res.send(careplan);
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving care plan."
                });
            }
        };

        // Find a single patient's care plan  by  patient ID and careplan ID
        exports.findOne = async (req, res) => {
              try {
                let patient = await Demographic.findById(req.params.idp);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                let careplan = await Careplan.findById(req.params.idi);
                res.send(careplan);
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving care plan."
                });
            }
        };


        //Update a patient's careplan by patient ID and careplan ID
        exports.update = async (req, res) => {
            try {
                let patient = await Demographic.findById(req.params.idp);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                let careplan = await Careplan.findById(req.params.idi);
                util.setObVal(careplan, req.body);
                careplan.save().then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the patient."
                    });
                });
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving care plan."
                });
            }

        };

        //Delete a patient's care plan by patient ID and careplan ID
        exports.delete = async (req, res) => {
            try {
                let patient = await Demographic.findById(req.params.idp);
                if (!patient){
                    return res.status(404).send({
                        message: "Patient not found "
                    });
                }
                const index =patient.careplans.indexOf(req.params.idi);
                if (index > -1) {
                    patient.careplans.splice(index, 1);
                }
                let careplan = await Careplan.findByIdAndRemove(req.params.idi);
                if (!careplan) {
                    return res.status(404).send({
                        message: "care plan not found "
                    });
                }
                patient.save().then(data => {
                    res.send({message: "care plan deleted successfully!"})
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the patient."
                    });
                });

            } catch (err) {
                res.status(500).send({
                    message: "Error deleting care plan by id ."
                });
            }

        };

