const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    contactInfo: {
        phone: String,
        email: String,
        address: String
    },
    enrolledPrograms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Client', clientSchema);
