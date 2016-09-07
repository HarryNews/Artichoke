//var valRegex = /\((-?\d+(?:\.\d+)?)|(?:\$(\w+(?:\.\w+)*)) [\*\/\+\-] (-?\d+(?:\.\d+)?)|(?:\$(\w+(?:\.\w+)*))/

var DataBind = {};

// var operations =
// {
// 	"+": { order: 0, fxn: add },
// 	"-": { order: 0, fxn: subtract },
// 	"*": { order: 1, fxn: multiply },
// 	"/": { order: 1, fxn: divide },
// 	"^": { order: 2, fxn: power },
// };

var constants = 
[
	{ name: "sin", value: sin },
	{ name: "cos", value: cos },
	{ name: "tan", value: tan },
	{ name: "asin", value: atan },
	{ name: "acos", value: acos },
	{ name: "atan", value: atan },
	{ name: "pi", value: Math.PI }
]	


DataBind.parseEquation = function(str)
{

}

DataBind.getNumber = function(str, i)
{
	var numChars = "0123456789";

	var ret = "";

	if( "+-".includes(str.charAt(i)) )
		ret += str.charAt(i++);

	for(; str.charAt(i) && numChars.includes(str.charAt(i)); i++)
		ret += str.charAt(i);

	if( str.charAt(i) === '.')
	{
		ret += str.charAt(i++);

		for(; str.charAt(i) && numChars.includes(str.charAt(i)); i++)
			ret += str.charAt(i);
	}

	return parseFloat(ret);
}

DataBind.getVariable = function(str, i)
{
	if(str.charAt(i) === "_")
	{
		if(str.charAt())
	}
}

module.exports = DataBind;