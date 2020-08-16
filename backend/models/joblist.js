var mongoose = require('mongoose');
var projectSchema = new mongoose.Schema({
    pName: {
        type: String,
        required: true
    },
    pDescription: {
        type: String,
        required: true
    },
    techStach: [{
        type: String,
        required: true
    }],
    required: {
        type: Number,
        required: true
    },
    submitted: {
        type: Number,
        default: 0
    },
    selected: {
        type: Number,
        default: 0
    },
    candidates:[]
});
module.exports = mongoose.model('projects', projectSchema);
