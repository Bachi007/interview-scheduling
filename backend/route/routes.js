var express = require('express');
var router = express.Router();
var users = require('../models/users.js');
var employee = require('../models/employee.js')
var joblist = require('../models/joblist.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Guid = require('guid');
const sha256 = require('sha256');
const req = require('request');
const request = require('request-promise');

//user retrive
router.get('/user', (req, res) => {
    users.find({}).exec((err, result) => {
        if (err) throw err
        else {
            res.json(result);
        }
    })
})

//user insert
router.post('/users', (req, res) => {
    users.create(req.body, function (err, result) {
        if (err) throw err
        else {
            // res.send(result);
            joblist.updateOne({ pName: req.body.pName },
                {
                    $inc: { submitted: 1 },
                    $push: { 'candidates': result }
                }, (err, usr) => {
                    if (err) throw err
                    else {
                        res.send(usr);
                    }
                })
        }
    })
})

router.put('/usersUpdate', (req, res) => {

    users.updateOne({ _id: req.query.userId },
        { $set: { interviewerName: req.body.interviewerName } }, function(err, result){
            if (err) throw err
            else{
                res.send(result);
            }
        }
    )
})

// router.put('/users',(req,res)=>{
//     let 
// })

//employee retrive
router.get('/employee', (req, res) => {
    employee.find({}).exec((err, result) => {
        if (err) throw err
        else {
            res.json(result);
        }
    })
})

// employee insert && password is hashed(encrypted)
// router.post('/employees',(req,res)=>{
//     var epassword=req.body.epassword;
//         bcrypt.hash(epassword, saltRounds, function(err, hash) {
//             if (err) throw err
//             let InsertEmployee=new employee({
//                 epassword:hash,
//                 ename:req.body.ename,
//                 eemail:req.body.eemail,
//                 emobile:req.body.emobile,
//                 erole:req.body.erole
//             })
//             InsertEmployee.save((err,result)=>{
//             if (err) throw err
//             else{
//                 res.send(result);
//             }
//         })
//     });     
// })


router.post('/employees', (req, res) => {

    employee.create(req.body, (err, result) => {
        if (err) throw err
        else {
            res.send(result);
        }
    })
});

// to compare the password we use below code
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });


//jobs retrive
router.get('/job', (req, res) => {
    joblist.find({}).exec((err, result) => {
        if (err) throw err
        else {
            res.json(result);
        }
    })
})

//jobs insert
router.post('/jobs', (req, res) => {
    joblist.create(req.body, function (err, result) {
        if (err) throw err
        else {
            res.send(result);
        }
    })
})

// router.User.findOne({_id: idd}, function(err, usr){
//     usr.info = "some new info";
//     usr.save(function(err) {
//     });
//  });

//login route

router.post('/login', (req, res) => {

    employee.findOne({ empId: req.body.empId }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            if (data.password == req.body.password) {
                            res.send({data,isAuth: true });
            } else {
                res.send({ "msg": "pls enter valid username...", isAuth: false });
            }
        }
    })
})
// profile api
router.get('/profile', (req, res) => {

    employee.findOne({ empId: req.query.empId }, function(err, result){
            if (err) throw err
            else{
                if(result){
                    res.send(result);
                } else {
                    res.send([]);
                }
                
            }
        }
    )
})

// search in users list of manager
router.route('/users/search').get(function (req, res) {

    var regex = new RegExp(req.query.search, "i");
    var query = {
        $or: [{ skillSet: regex },
             { userMail:regex }
        ]
    };
    users.find(query, function (err, result) {
        if (err) {
            res.json(err);
        }

        res.json(result);
    });


});

// skype api
router.post('/interview', (req, res) => {
    var options = {
      uri: 'https://interviews.skype.com/api/interviews',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + generateToken(JSON.stringify(req.body))
      },
      body: req.body,
      json: true
   };
   
    request(options).then((response)=>{
        if(response) {
            users.update({'_id': req.query.userId},{$set: {'scheduleStatus':true}}, function(err, result) {
                if(err){
                    res.send(err);
                } else{
                    res.send(response);
                    console.log("updated",result)
                }
            })
        }
    }).catch((error)=>{
      res.send(error);
    })
   })
   
   function generateToken(content){
    return jwt.sign({
      jti: Guid.raw(),
      iss: "daeaccd3-79a8-3789-ac57-28c31115e3fa",
      sub: sha256(content),
      exp: Math.floor(Date.now() / 1000) + 10
    }, "79e141d2-b9dd-f9e0-4489-35aaaf5e6772")
   }

//feedBack for candidiate by interviewer
   router.put('/feedback', (req, res) => {
    users.updateOne({_id: req.query.userId  },
       {$set: {feedback:req.body.feedback}}, function (err, result) {
        if (err) throw err
        else {
           res.send(result);
        }
    }
    )
})

router.put('/storeUrls', (req, res) => {
    users.updateOne({_id: req.query.userId  },
       {$set: {urls:req.body.urls}}, function (err, result) {
        if (err) throw err
        else {
           res.send(result);
        }
    }
    )
})


router.get('/url', (req, res) => {

    users.findOne({ _id: req.query.userId }, function(err, result){
            if (err) throw err
            else{
                if(result){
                    res.send(result);
                } else {
                    res.send([]);
                }
                
            }
        }
    )
})


   

module.exports = router;