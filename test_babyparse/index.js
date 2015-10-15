var baby = require("babyparse")
var fs = require('fs')
var file = fs.readFileSync("data.csv").toString()

var called = false
var results = baby.parse(file, 
	{	header: true,			//First row will be interpreted as field names.
		fastMode: true,			//Speeds up parsing for files that contain no quotes.
		skipEmptyLines: true,	//Skips empty lines.
		dynamicTyping: true,	//Numeric and boolean data will be converted to their type.
		delimiter: ";", 		//The delimiting character. Leave blank to auto-detect.
		complete: function(results) {	//The callback to execute when parsing is complete.
			if(!called){
				console.log("Finished:", results.data)
				called = true
			} 
		}
	}
)