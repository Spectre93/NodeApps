exports.getData = function(){	
	var baby = require("babyparse");
	var fs = require('fs');
	
	//FileName will be function argument later
	//var file = fs.readFileSync("public/files/veelData.csv").toString();
	var file = fs.readFileSync("public/files/betereData.csv").toString();
	//var file = fs.readFileSync("public/files/realData.csv").toString();

	return baby.parse(file, {	
		header: true,					//First row will be interpreted as field names.
		fastMode: true,				//Speeds up parsing for files that contain no quotes.
		skipEmptyLines: true,	//Skips empty lines.
		dynamicTyping: true,	//Numeric and boolean data will be converted to their type.
		delimiter: ";" 				//The delimiting character. Leave blank to auto-detect.
	});
}

exports.parseData = function(req){
	var inputData = this.getData();
	var resultData = [];
	
	var startDate = req.query.startDate || "0000/00/00 00:00:00";	//if undefined, use this as start date
	var endDate = req.query.endDate || "9999/99/99 99:99:99";			//if undefined, use this as end date
	
	for(var i = 0; i < inputData.data.length; i++){
		var resultObject = {};
		var currentEntry = inputData.data[i];
		
		var date 									= currentEntry.Date + " " + currentEntry.Time;
		var basalRate 						= currentEntry["Basal Rate (U/h)"];
		var bgReading 						= currentEntry["BG Reading (mmol/L)"];
		var bolusVolumeSelected 	= currentEntry["Bolus Volume Selected (U)"];
		var bolusVolumeDelivered 	= currentEntry["Bolus Volume Delivered (U)"];
		var bwzCarbInputG 				= inputData.data[i]["BWZ Carb Input (grams)"];
		
		if(basalRate != ""){						resultObject.basalRate 						= basalRate;}
		if(bgReading != ""){						resultObject.bgReading 						= bgReading;}			
		if(bolusVolumeSelected != ""){	resultObject.bolusVolumeSelected 	= bolusVolumeSelected;}
		if(bolusVolumeDelivered != ""){	resultObject.bolusVolumeDelivered = bolusVolumeDelivered;}			
		if(bwzCarbInputG != ""){				resultObject.bwzCarbInputG 				= bwzCarbInputG;}
		
		if(Object.keys(resultObject).length != 0){	//if empty object, don't add the date				
			if(date >= startDate && date <= endDate){
				resultObject.date = date;
				resultData.push(resultObject);
			}
		}
	}
	resultData.sort(function (a, b) {	//sort when done
		if (a.date > b.date)
			return 1;
		else if (a.date < b.date)
			return -1;
		else 
			return 0;
	});
	return resultData;
}