    const mongoose = require('mongoose');

    const demogSchema = mongoose.Schema({
             firstname: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            },
            gender:{
                type: String,
                enum : ['Male','Female']
             },
            address: {
                anumber: Number,
                street: String,
                city: String,
                pcode: String
            },
            telephone: {
                type: String,
                required: true
            },
        maritalstatus: {
            type: String,
            enum: ['Single', 'Married', 'Widowed', 'Divorced', 'Separated'],
            default: 'Single'
        },
        religion: {
            type: String
        },
        ethnicorigin: {
            type: String
        },
        language: {
            type: String
        },
        birthday: {
            type: Date,
            required: true
        },
        guardian: {
            role: {
                type: String,
            },
            firstname: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            },
            address: {
                number: Number,
                street: String,
                city: String,
                pcode: String
            },
            telephone: {
                type: String,
                required: true
            }
        },
        provider: {
            providername: {
                type: String,
                required: true
            },
            address: {
                number: Number,
                street: String,
                city: String,
                pcode: String
            },
            telephone: {
                type: String,
                required: true
            }
        },
        allergies:
            [{
                allname: String,
                reaction: String,
                severity: String
            }],
        inmunizations:
            [{
                type: mongoose.Schema.Types.ObjectId, ref: 'Inmunization'
            }],

        medications:
            [{
                type: mongoose.Schema.Types.ObjectId, ref: 'Medication'
            }],
        encounters:
            [{
                type: mongoose.Schema.Types.ObjectId, ref: 'Encounter'
            }],
        careplans:
            [{
                type: mongoose.Schema.Types.ObjectId, ref: 'Careplan'
            }]

    });

    module.exports = mongoose.model('Demographic', demogSchema);
