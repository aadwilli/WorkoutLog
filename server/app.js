//importing the express module
var express = require('express');
//calling the express function in the app variable
var app = express();
//This package will help the server parse out incoming requests that are easier to work with
var bodyParser = require('body-parser');
//importing the header file
app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("Hello World");
});
//adding the app.listen so the server will start up when it's run on Port 3000
app.listen(3000, function(){
	console.log("app is listening on 3000");
});

var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'Letmein1234!', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function(){
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);

//build a user model in sqllize
	var User = sequelize.define('user', {
		username: Sequelize.STRING,
		passwordhash: Sequelize.STRING,
	});
//creates a table in postgres and matches the model we defined
	User.sync()
//DANGER!!!!This drops the table if need to do so. Leave commented for now
// User.sync({force:true});

//telling the app to use bodyParser
//parse data off incoming requests and turn it into JSON. 
//Takes the JSON and exposes it to be used for req.body
app.use(bodyParser.json());
//API endpoint handling incoming POST request
app.post('/api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;
	//User object
	User.create({
		username: username,
		passwordhash: ""
	}).then(
			//Sequilize is going to return the object it created from db.
			function createSuccess(user){
				res.json({
					user: user,
					message: 'created'
				})
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
});





