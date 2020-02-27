                    const Demographic = require('../models/demographics.js');
                    const Encounter = require('../models/encounter.js');
                    const Careplan = require('../models/careplan.js');
                    const Inmunization = require('../models/inmunization.js');
                    const Medication = require('../models/medication.js');
                    const util = require('./utils.js');

                    // Create and Save a new patient
                    exports.create = (req, res) => {

                        // Validate request
                         if(!req.body.lastname||!req.body.firstname||!req.body.birthday) {
                            return res.status(400).send({
                                message: "Patient´s Firstname, Lastname and birthsay are mandatory fields"
                            });
                        }

                        // Create a new patient
                        const newpat = new Demographic();
                        util.setObValSp(newpat,req.body,"allergies");

                        // Save patient in the database
                        newpat.save().then(data => {
                                res.send(data);
                            }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the patient."
                            });
                        });


                    };

                    // Retrieve and return all patients from the database.
                    //
                    exports.findAll = async (req, res) => {

                        try {
                            let demographic = await Demographic.find();
                            res.send(demographic);
                        } catch (err) {
                            res.status(500).send({
                                message: err.message || "Some error occurred while retrieving patients."
                            });
                        }
                    };

                    // Find a single patient by id (main data)

                    exports.findOnePpal = async (req, res) => {
                        try {
                            // console.log(req.params.id);
                            let demographic = await Demographic.findById(req.params.id)
                                .select("-inmunizations")
                                .select("-medications")
                                .select("-encounters")
                                .select("-careplans");

                            if(!demographic) {
                                return res.status(404).send({
                                    message: "Patient not found "
                                });
                            }
                            console.log(demographic);
                            res.send(demographic);
                        } catch (err) {
                            res.status(500).send({
                                message: "Error retrieving patient by id ."
                            });
                        }
                    };


                    // Find a single patient by id (complete)

                    exports.findOne = async (req, res) => {
                        try {
                            // console.log(req.params.id);
                            let demographic = await Demographic.findById(req.params.id)
                                .populate("inmunizations")
                                .populate("medications")
                                .populate("encounters")
                                .populate("careplans");

                            if(!demographic) {
                                return res.status(404).send({
                                    message: "Patient not found "
                                });
                            }
                             console.log(demographic);
                             res.send(demographic);
                        } catch (err) {
                            res.status(500).send({
                                message: "Error retrieving patient by id ."
                            });
                        }
                    };

                    // Update a patient  identified by the Id in the request
                    exports.update = async (req, res) => {
                                          // Validate Request
                                    try {
                                               let foundpat = await Demographic.findById(req.params.id);
                                               if (!foundpat){
                                                   return res.status(404).send({
                                                       message: "Patient not found "
                                                   });

                                               }
                                               else{
                                                    console.log("Updated " + foundpat);
                                                   util.setObValSp(foundpat,req.body,"allergies");
                                                   // console.log("Updated " + foundpat);
                                                   foundpat.save().then(data => {
                                                       res.send(data);
                                                   }).catch(err => {
                                                       res.status(500).send({
                                                           message: err.message || "Some error occurred while updating the patient."
                                                       });
                                                   });
                                               }
                                               }
                                        catch (err) {
                                    res.status(500).send({
                                        message: "Error retrieving patient by id ."
                                    });
                                }
                                };

                    // Update a patient's allergy  by patient Id and allergy Id

                    exports.modifyAll = async (req, res) => {
                          try {
                            let foundpat = await Demographic.findById(req.params.id);
                            if (!foundpat){
                                return res.status(404).send({
                                    message: "Patient not found "
                                });

                            }
                            else{
                               foundpat.allergies.forEach(function(val){
                                   if (val.id===req.params.ida) {
                                        for (let key in req.body) {
                                            if (req.body.hasOwnProperty(key)) {
                                                if (req.body[key]) {
                                                    val[key] = req.body[key];
                                                 }
                                            }
                                        }
                                    }
                                });
                                foundpat.save().then(data => {
                                    res.send(data);
                                }).catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while updating the patient."
                                    });
                                });
                            }
                        }
                        catch (err) {
                            res.status(500).send({
                                message: "Error retrieving patient by id ."
                            });
                        }
                    };

                    // Remove a patient's allergy  by patient Id and allergy Id

                    exports.deleteAll = async (req, res) => {
                        try {
                            let foundpat = await Demographic.findById(req.params.id);
                            if (!foundpat){
                                return res.status(404).send({
                                    message: "Patient not found "
                                });

                            }
                            else{
                                 foundpat.allergies.forEach(function(val, index){
                                    if (val.id===req.params.ida) {
                                          foundpat.allergies.splice(index, 1);
                                     }
                                 });

                                foundpat.save().then(data => {
                                    res.send(data);
                                }).catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while updating the patient."
                                    });
                                });
                            }
                        }
                        catch (err) {
                            res.status(500).send({
                                message: "Error retrieving patient by id ."
                            });
                        }
                    };


                    // Delete a patient  with the specified Id in the request
                        exports.delete = async (req, res) => {
                                 try {
                                    console.log(req.params.id);
                                     const foundpat = await Demographic.findById(req.params.id);
                                     if (!foundpat){
                                         return res.status(404).send({
                                             message: "Patient not found "
                                         });
                                    }
                                     else {

                                         const related = ["inmunizations", "medications", "encounters", "careplans"];
                                         for(let val of related) {
                                              await util.delRelatedDoc(val,foundpat[val],res);
                                          }
                                         await Demographic.findByIdAndRemove(req.params.id);
                                         res.send({message: "Patient deleted successfully!"})
                                     }
                                 }
                                 catch (err) {
                                     res.status(500).send({
                                         message: "Error deleting patient by id ."+err
                                     })
                                 }

                               };