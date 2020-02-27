    const mongoose = require('mongoose');

    const encounterSchema = mongoose.Schema({
        enctype:{
            type: String,
            required: true
        },
        encday:{
            type: Date,
            required: true
        },
       provider:{
            type: String
        },
       institution:{
            type: String
        }

    });

    module.exports = mongoose.model('Encounter', encounterSchema);