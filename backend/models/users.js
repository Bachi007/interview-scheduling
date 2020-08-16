var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userMail: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    skillSet:[{
        type: String,
        required: true
    }],
    scheduleStatus:{
        type:Boolean,
        default:false
    },
    resume: {
        type: String,
        required:true
    },
    interviewerName:{
        type:String,
    },
    selected: {
         type:Boolean,
         default:false
    },
    feedback:{
         type:String,
    },
    urls:[]
    
});
module.exports = mongoose.model('users', userSchema);