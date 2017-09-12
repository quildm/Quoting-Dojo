
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// Set up database connection, Schema, model
mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = new mongoose.Schema({
  name: String,
  quote: String
});
var Quote = mongoose.model('quotes', QuoteSchema);

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index.ejs');
    console.log("loaded index.ejs");
  })

app.get('/quotes', function(req, res){
    // Logic to grab all quotes and pass into the rendered view
    Quote.find({}, function(err, results){
      if(err) { console.log(err); }
      res.render('quotes', { quotes: results });
    });
  });

app.post('/quotes', function(req, res){
  Quote.create(req.body, function(err){
    if(err) { console.log(err); }
    res.redirect('/quotes');
  });
});

app.listen(8000, function() {
 console.log("listening on port 8000!");
})