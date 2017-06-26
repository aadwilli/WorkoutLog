var express = require('express'); //importing the express module
var app = express(); //calling the express function in the app variable
var bodyParser = require('body-parser'); //This package will help the server parse out incoming requests that are easier to work with
var sequelize = require('./db.js'); //importing the db.js module back in

var User = sequelize.import('./models/user'); //imports sequelize while importing the user model
//creates a table in postgres and matches the model we defined
User.sync() // sync({force:true}) WARNING: this will DROP the table each time the app starts!
//telling the app to use bodyParser//parse data off incoming requests and turn it into JSON. //Takes the JSON and exposes it to be used for req.body
app.use(bodyParser.json());
app.use(require('./middleware/headers')); //importing the header file
app.use('/api/user', require('./routes/user'));
//login route
app.use('/api/login', require('./routes/session'));
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

//adding the app.listen so the server will start up when it's run on Port 3000
app.listen(3000, function(){
	console.log("app is listening on 3000");
});








