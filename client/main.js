$(document).ready(function()
{
	var DataBind = require("./modules/DataBind.js");
	$(".title-button:not(.disabled)").click(function()
	{
		// var toTest = [["+12.34", 0], ["-12.34", 0], ["-.1234", 0], [".1234", 0], ["1234.", 0], ["abc 1234", 0], ["abc 1234", 4], 
		// 	["1234abc", 0], [".", 0], ["", 0], ["+", 0], ["abcd", 0], ["1234", 2]];

		// for(var i in toTest)
		// {
		// 	console.log("('" + toTest[i][0] + "', " + toTest[i][1] + ") -> " + 
		// 		DataBind.getNumber(toTest[i][0], toTest[i][1]));
		// }
		// console.log(DataBind.getNumber("+12.34", 0));
		// console.log(DataBind.getNumber("-12.34", 0));
		// console.log(DataBind.getNumber("+.1234", 0));
		// console.log(DataBind.getNumber(".1234", 0));
		// console.log(DataBind.getNumber("1234.", 0));
		// console.log(DataBind.getNumber("abc 1234", 0));
		// console.log(DataBind.getNumber("abc 1234", 4));
		// console.log(DataBind.getNumber("1234 abc", 0));
		var p;
		if(p = true)
		{
			console.log(p);
		}
	});
});