const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
var cors=require('cors');
var mydb='mongodb+srv://svu:2505@cluster0-2qz8u.mongodb.net/test?retryWrites=true&w=majority'; //mydb is the database name

var route=require('./route/routes')
mongoose.connect(mydb, { useNewUrlParser: true }); //connecting to the database using mongoose
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(cors());

//routing the api's
app.use('/api',route); //should type the url as /api/route


//port 3000 
app.listen(3000,function(req,res){
    console.log('listening on : 3000');
});