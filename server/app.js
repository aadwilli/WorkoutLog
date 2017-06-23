//importing the express module
var express = require('express');
//calling the express function in the app variable
var app = express();

app.use('/api/test', function(req, res){
	res.send("Hello World");
});
//adding the app.listen so the server will start up when it's run on Port 3000
app.listen(3000, function(){
	console.log("app is listening on 3000");
});