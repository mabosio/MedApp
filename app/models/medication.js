    const mongoose = require('mongoose');

    const medicationSchema = mongoose.Schema({

         medday:{
            type: Date,
            required: true
        },
        medtype:{
            type: String,
            required: true
        },
        medname:{
            type: String,
            required: true
        },
       medinstrc:{
            type: String,
            required: true
        },
        meddose:{
             type:Number,
             required: true
        },
        doseunis:{
            type: String,
            required: true
        },
        medfrec:{
             type: String,
            required: true
        },
        frecunits:{
            type: String,
            required: true
        },
        prescriber:{
            type: String,
            required: true
        }
    });

    module.exports = mongoose.model('Medication', medicationSchema);
