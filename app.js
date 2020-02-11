var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();


app.use(express.static(path.join(__dirname , '/public')));


// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.dataArray = [];
// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

//newpage
app.get('/new', function(req, res) {
    let id = req.param('id');
    if(id != null){
    app.dataArray.push(id);
    }
    res.render('pages/new', { 
        dataArray: app.dataArray
     });
  });



// upLoadData page 
// sending a get with 1 param
// http://localhost:3000/uploadData?id=2
app.get('/uploadData', function(req, res) {
    let id = req.param('id');
    if(id != null){
    app.dataArray.push(id);
    }
    res.render('pages/uploadData', { 
        dataArray: app.dataArray
     });
  });



// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let error ={
        status: "this is real bad",
        stack: "somebody called somebody who called somebody"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: error
    });
});



app.listen(3000);  // not setting port number in www.bin, simple to do here
console.log('3000 is the magic port');
//change www up in the bin folder and here to 3000, if you want to run locally
//change www up in the bin folder and here to 443, if you want to run online when submitting
module.exports = app;
