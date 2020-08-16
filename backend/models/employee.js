var mongoose = require('mongoose');

var empSchema = new mongoose.Schema({
    empId: {
        type: Number,
        required: true
    },
    empName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    empPhno: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('employees', empSchema);

