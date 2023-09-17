const mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    id: { type: Number },
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String }
});

module.exports = mongoose.model('employee', employeeSchema, 'employee');