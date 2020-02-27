    const mongoose = require('mongoose');

    const careplanSchema = mongoose.Schema({
        activity:{
            type: String,
            required: true
        },
        actday:{
            type: Date,
            required: true
        },
       actinstruc:{
            type: String
        }

    });

    module.exports = mongoose.model('Careplan', careplanSchema);
