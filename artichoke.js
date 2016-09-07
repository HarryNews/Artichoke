var express = require("express");
var app = express();

app.get("/", function(req, res)
{
	res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(__dirname + "/public"));

app.listen(3001, function()
{
	// 3001 because 3000 was using the raesonic favicon for some strange reason
	console.log("Listening on port 3001"); 
});